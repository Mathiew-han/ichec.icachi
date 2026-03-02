import { NextResponse } from "next/server";

import Stripe from "stripe";

import { getEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getClientIpFromHeaders, rateLimit } from "@/lib/security/rate-limit";

const LOCALES = new Set(["en", "zh-CN", "zh-TW", "pt"]);

function normalizeBasePath(value: string | undefined): string {
  if (!value) return "";
  if (value === "/") return "";
  return `/${value}`.replace(/\/+/g, "/").replace(/\/+$/, "");
}

function inferLocaleFromRequest(request: Request): string {
  const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
  const referer = request.headers.get("referer");
  if (referer) {
    try {
      const url = new URL(referer);
      const pathname = url.pathname;
      const pathnameNoBase =
        basePath && pathname.startsWith(`${basePath}/`)
          ? pathname.slice(basePath.length)
          : pathname === basePath
            ? "/"
            : pathname;
      const first = pathnameNoBase.split("/")[1] ?? "";
      if (LOCALES.has(first)) return first;
    } catch {
      return "en";
    }
  }
  return "en";
}

const PRICE_BY_KIND: Record<string, { amount: number; currency: string; name: string }> =
  {
    submission_fee: {
      amount: 10000,
      currency: "usd",
      name: "Submission fee",
    },
  };

export async function POST(request: Request) {
  const ip = getClientIpFromHeaders(request.headers);
  const rl = rateLimit(`stripe_checkout:${ip}`, { windowMs: 60_000, max: 20 });
  if (!rl.ok) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: { "retry-after": String(rl.retryAfterSeconds) },
    });
  }

  const body = (await request.json().catch(() => null)) as
    | { kind?: string }
    | null;
  const kind = body?.kind;

  if (!kind || !(kind in PRICE_BY_KIND)) {
    return NextResponse.json({ error: "Invalid kind" }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY",
      },
      { status: 500 },
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const price = PRICE_BY_KIND[kind];

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      kind,
      amount: price.amount,
      currency: price.currency,
      status: "created",
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return NextResponse.json(
      { error: orderError?.message ?? "Failed to create order" },
      { status: 500 },
    );
  }

  const stripeSecretKey = getEnv("STRIPE_SECRET_KEY");
  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: "Missing STRIPE_SECRET_KEY" },
      { status: 500 },
    );
  }

  const stripe = new Stripe(stripeSecretKey);

  const origin = new URL(request.url).origin;
  const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
  const locale = inferLocaleFromRequest(request);
  const successPath = `${basePath}/${locale}/dashboard/billing/success`.replace(/\/+/g, "/");
  const cancelPath = `${basePath}/${locale}/dashboard/billing/cancel`.replace(/\/+/g, "/");

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: price.currency,
          product_data: {
            name: price.name,
          },
          unit_amount: price.amount,
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}${cancelPath}`,
    metadata: {
      order_id: order.id,
      user_id: user.id,
      kind,
    },
  });

  await supabase
    .from("orders")
    .update({ stripe_session_id: session.id, status: "pending" })
    .eq("id", order.id);

  return NextResponse.json({ url: session.url });
}
