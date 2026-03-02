"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import styles from "./auth.module.css";

function normalizeBasePath(value: string | undefined): string {
  if (!value) return "";
  if (value === "/") return "";
  return `/${value}`.replace(/\/+/g, "/").replace(/\/+$/, "");
}

function detectLocaleFromPathname(pathname: string): string {
  const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0] ?? "";
  const candidate = basePath ? segments[1] ?? "" : first;
  const maybeLocale = basePath ? candidate : first;
  const firstSegmentIfNoBase = basePath ? maybeLocale : first;
  const localeCandidate = basePath ? maybeLocale : firstSegmentIfNoBase;
  if (
    localeCandidate === "en" ||
    localeCandidate === "zh-CN" ||
    localeCandidate === "zh-TW" ||
    localeCandidate === "pt"
  ) {
    return localeCandidate;
  }
  if (first === "en" || first === "zh-CN" || first === "zh-TW" || first === "pt") {
    return first;
  }
  return "en";
}

function safeNextPath(value: string | null, fallback: string): string {
  if (!value) return fallback;
  if (!value.startsWith("/")) return fallback;
  if (value.startsWith("//")) return fallback;
  return value;
}

export default function AuthPage() {
  const supabase = useMemo(() => {
    try {
      return createSupabaseBrowserClient();
    } catch {
      return null;
    }
  }, []);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [codeExpiresInSeconds, setCodeExpiresInSeconds] = useState(0);

  const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const captchaEnabled = turnstileSiteKey.length > 0;
  const turnstileRef = useRef<TurnstileInstance | undefined>(undefined);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [messageTone, setMessageTone] = useState<"info" | "error">("info");

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const t = window.setInterval(() => {
      setCooldownSeconds((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(t);
  }, [cooldownSeconds]);

  useEffect(() => {
    if (codeExpiresInSeconds <= 0) return;
    const t = window.setInterval(() => {
      setCodeExpiresInSeconds((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(t);
  }, [codeExpiresInSeconds]);

  async function sendCode() {
    if (!supabase) {
      setMessage(
        "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY",
      );
      setMessageTone("error");
      return;
    }
    if (cooldownSeconds > 0) return;

    setBusy(true);
    setMessage(null);

    if (captchaEnabled && !captchaToken) {
      setMessage("请先完成验证码校验。");
      setMessageTone("error");
      setBusy(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        captchaToken: captchaToken ?? undefined,
      },
    });

    if (captchaEnabled) {
      setCaptchaToken(null);
      setCaptchaError(null);
      turnstileRef.current?.reset();
    }

    if (error) {
      const msg = error.message;
      setMessage(msg);
      setMessageTone("error");
      if (/rate limit/i.test(msg)) {
        setCooldownSeconds(300);
      } else {
        setCooldownSeconds(60);
      }
      setBusy(false);
      return;
    }

    setMessage("验证码已发送（6位数字），有效期 2 分钟。");
    setMessageTone("info");
    setCooldownSeconds(60);
    setCodeExpiresInSeconds(120);
    setBusy(false);
  }

  async function verifyCode() {
    if (!supabase) {
      setMessage(
        "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY",
      );
      setMessageTone("error");
      return;
    }

    const token = code.trim();
    if (!/^\d{6}$/.test(token)) {
      setMessage("请输入 6 位数字验证码。");
      setMessageTone("error");
      return;
    }
    if (codeExpiresInSeconds <= 0) {
      setMessage("验证码已过期，请重新发送。");
      setMessageTone("error");
      return;
    }

    setBusy(true);
    setMessage(null);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (error) {
      setMessage(error.message);
      setMessageTone("error");
      setBusy(false);
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage(userError?.message ?? "登录成功，但未读取到用户信息。");
      setMessageTone("error");
      setBusy(false);
      return;
    }

    const { error: profileError } = await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
    });

    if (profileError) {
      setMessage(`登录成功，但保存邮箱失败：${profileError.message}`);
      setMessageTone("error");
      setBusy(false);
      return;
    }

    const locale = detectLocaleFromPathname(window.location.pathname);
    const search = new URLSearchParams(window.location.search);
    const next = safeNextPath(search.get("next"), `${basePath}/${locale}/dashboard`.replace(/\/+/g, "/"));
    window.location.href = next;
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.href = `${basePath}/`.replace(/\/+$/, "/");
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>Portal</div>
        <h2 className={styles.title}>登录</h2>
        <p className={styles.lead}>
          使用邮箱验证码登录。若触发邮件发送频率限制，请等待冷却时间或在 Supabase 配置自定义 SMTP。
        </p>
      </div>

      <div className={styles.form} aria-busy={busy}>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="auth-email">
            Email
          </label>
          <input
            id="auth-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={styles.input}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        {captchaEnabled ? (
          <div className={styles.turnstileWrap}>
            <Turnstile
              ref={turnstileRef}
              siteKey={turnstileSiteKey}
              onSuccess={(token) => {
                setCaptchaToken(token);
                setCaptchaError(null);
              }}
              onExpire={() => {
                setCaptchaToken(null);
              }}
              onUnsupported={() => {
                setCaptchaToken(null);
                setCaptchaError("当前浏览器不支持验证码组件。");
              }}
              onError={() => {
                setCaptchaToken(null);
                setCaptchaError("验证码加载失败，请刷新页面或检查 Turnstile 域名配置。");
              }}
              options={{ theme: "auto" }}
            />
            {captchaError ? (
              <div className={`${styles.message} ${styles.messageError}`}>{captchaError}</div>
            ) : null}
          </div>
        ) : null}

        <div className={styles.row}>
          <div className={styles.actions}>
            <button
              type="button"
              disabled={busy || email.length === 0 || cooldownSeconds > 0}
              onClick={sendCode}
              className={styles.actionPrimary}
            >
              {cooldownSeconds > 0 ? `发送验证码（${cooldownSeconds}s）` : "发送验证码"}
            </button>
            <button type="button" onClick={signOut} className={styles.actionSecondary}>
              退出登录
            </button>
          </div>
          <div className={styles.helper}>验证码有效期 2 分钟。</div>
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="auth-code">
            验证码
          </label>
          <input
            id="auth-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            inputMode="numeric"
            pattern="\\d*"
            className={styles.input}
            placeholder="6 位验证码"
            autoComplete="one-time-code"
          />
          <div className={styles.actions}>
            <button
              type="button"
              disabled={busy || email.length === 0 || code.trim().length === 0 || codeExpiresInSeconds <= 0}
              onClick={verifyCode}
              className={styles.actionPrimary}
            >
              {codeExpiresInSeconds > 0 ? `验证并登录（${codeExpiresInSeconds}s）` : "验证码已过期"}
            </button>
            <button
              type="button"
              disabled={busy || email.length === 0 || cooldownSeconds > 0}
              onClick={sendCode}
              className={styles.actionSecondary}
            >
              {cooldownSeconds > 0 ? `重新发送（${cooldownSeconds}s）` : "重新发送"}
            </button>
          </div>
        </div>

        {message ? (
          <div className={`${styles.message}${messageTone === "error" ? ` ${styles.messageError}` : ""}`}>
            {message}
          </div>
        ) : null}
      </div>
    </div>
  );
}
