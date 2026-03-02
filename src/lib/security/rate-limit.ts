type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSeconds: number; remaining: 0 };

type RateLimitConfig = {
  windowMs: number;
  max: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

function now() {
  return Date.now();
}

export function getClientIpFromHeaders(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

export function rateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  const t = now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= t) {
    const resetAt = t + config.windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: Math.max(0, config.max - 1) };
  }

  if (existing.count >= config.max) {
    const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - t) / 1000));
    return { ok: false, retryAfterSeconds, remaining: 0 };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return { ok: true, remaining: Math.max(0, config.max - existing.count) };
}

