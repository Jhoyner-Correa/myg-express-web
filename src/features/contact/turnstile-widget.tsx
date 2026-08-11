"use client";

import Script from "next/script";
import { useEffect, useId, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

interface TurnstileWidgetProps {
  onTokenChange: (token: string) => void;
  resetKey: number;
}

// Official Cloudflare test key: always passes and works on any development hostname.
const TURNSTILE_DEV_SITE_KEY = "1x00000000000000000000AA";

export function TurnstileWidget({ onTokenChange, resetKey }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const reactId = useId();
  const siteKey = process.env.NODE_ENV === "development"
    ? TURNSTILE_DEV_SITE_KEY
    : process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const renderWidget = () => {
    if (!siteKey || !containerRef.current || !window.turnstile || widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "light",
      size: "flexible",
      language: "es",
      callback: (token: string) => onTokenChange(token),
      "expired-callback": () => onTokenChange(""),
      "error-callback": () => onTokenChange(""),
    });
  };

  useEffect(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      onTokenChange("");
    }
  }, [resetKey, onTokenChange]);

  useEffect(() => () => {
    if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
  }, []);

  if (!siteKey) return null;

  return (
    <>
      <Script
        id={`turnstile-${reactId.replace(/:/g, "")}`}
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderWidget}
      />
      <div ref={containerRef} className="min-h-[65px] w-full" aria-label="Verificación de seguridad" />
    </>
  );
}
