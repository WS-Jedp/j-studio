"use client";

import { Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

const SIGNAL       = "#0B5FDE";
const SIGNAL_HOVER = "#3D82F5";
const MONO         = { fontFamily: "'JetBrains Mono', 'Courier New', monospace" } as const;

// Radius + shadow tokens — consistent with the landing page
const R = { xs: "4px", sm: "8px", md: "12px", lg: "16px" };
const S = {
  dark: "0 8px 24px rgba(0,0,0,0.3), 0 32px 80px rgba(0,0,0,0.4)",
  card: "0 20px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
  code: "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(61,130,245,0.07), 0 0 36px rgba(11,95,222,0.07)",
};

const CONTEXT_LINES = [
  { text: "module: payments.checkout", type: "value" },
  { text: 'intent: "Process a payment"', type: "value" },
  { text: "guardrails:", type: "key" },
  { text: '  - "Never process without KYC"', type: "string" },
  { text: '  - "Show fee before confirm"', type: "string" },
  { text: "depends_on:", type: "key" },
  { text: "  - compliance.kyc", type: "value" },
];

const CODE_LINES = [
  { text: "// [CTX] compliance.kyc required", type: "comment" },
  { text: "const kyc = await compliance", type: "value" },
  { text: "  .verify(userId);", type: "value" },
  { text: "if (!kyc.verified)", type: "value" },
  { text: "  throw new KYCError();", type: "added" },
  { text: "", type: "empty" },
  { text: "return await stripe.charge(amount);", type: "value" },
];

function getContextColor(type: string) {
  switch (type) {
    case "key":    return SIGNAL;
    case "string": return "#4D8FE8";
    default:       return "rgba(255,255,255,0.45)";
  }
}

function getCodeColor(type: string) {
  switch (type) {
    case "comment": return "rgba(122,172,248,0.5)";
    case "added":   return "#3D82F5";
    default:        return "rgba(255,255,255,0.45)";
  }
}

// Minimal wave canvas
function BannerWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const tRef      = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["rgba(122,172,248,1)", "rgba(184,212,252,1)", "rgba(232,242,255,0.7)", "rgba(255,255,255,0.3)"];

    function draw() {
      if (!ctx || !canvas) return;
      const W = canvas.width; const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      for (let w = 0; w < 4; w++) {
        const freq  = 0.008 + w * 0.004;
        const amp   = 28 + w * 14;
        const phase = w * Math.PI * 0.7 + tRef.current * (0.3 + w * 0.1);
        const y0    = H * (0.25 + w * 0.18);
        ctx.beginPath();
        for (let x = 0; x <= W; x += 2) {
          const y = y0 + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 1.7 + phase * 0.5) * (amp * 0.4);
          if (x === 0) { ctx.moveTo(x, y); } else { ctx.lineTo(x, y); }
        }
        ctx.strokeStyle = colors[w % colors.length];
        ctx.lineWidth   = 1.5;
        ctx.globalAlpha = Math.max(0.1 - w * 0.015, 0);
        ctx.stroke();
      }
      ctx.globalAlpha  = 1;
      tRef.current    += 0.005;
      animRef.current  = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export function CTXFrameBanner({ scrollY }: { scrollY: number }) {
  const locale = useLocale();
  const t      = useTranslations("ctx-container");
  const router = useRouter();

  const translateY  = Math.min(scrollY * 0.03, 50);
  const scale       = 1 + Math.min(scrollY * 0.00002, 0.05);
  const opacityValue = Math.max(1 - scrollY * 0.0003, 0.5);

  return (
    <article
      className="relative w-full md:w-auto row-span-5 md:row-auto h-full p-9 col-span-1 md:col-span-4 ease-linear transition-all duration-500 overflow-hidden"
      style={{
        background:   "#0A1628",
        borderRadius: R.lg,
        boxShadow:    S.dark,
        transform:    `translateY(${translateY}px) scale(${scale})`,
        opacity:      opacityValue,
        willChange:   "transform, opacity",
      }}
    >
      {/* Wave canvas */}
      <BannerWave />

      {/* Dot grid — fades toward left, frames the cards */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize:  "26px 26px",
          maskImage:       "radial-gradient(ellipse 80% 70% at 70% 50%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 70% 50%, black 0%, transparent 70%)",
        }}
      />

      {/* Signal ambient glow — sits behind the cards */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "5%", bottom: "-10%",
          width: 480, height: 480,
          background: "radial-gradient(circle, rgba(11,95,222,0.08) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
      />

      {/* Left edge signal accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(11,95,222,0.5) 40%, rgba(11,95,222,0.15))", borderRadius: `${R.lg} 0 0 ${R.lg}` }}
      />

      {/* ── Header ── */}
      <section className="flex flex-col sm:flex-row flex-nowrap items-start sm:items-center justify-between gap-4 sm:gap-0 mb-8 relative z-10">
        <article className="flex flex-row flex-nowrap items-center justify-start gap-3">
          {/* Wordmark */}
          <div className="flex items-baseline gap-0">
            <span style={{ color: "#FFFFFF", fontWeight: 700, fontSize: "20px", letterSpacing: "-0.01em" }}>CTX</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400, fontSize: "20px" }}>Frame</span>
          </div>
          {/* Signal badge */}
          <span
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              ...MONO, fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase" as const,
              color: SIGNAL, background: "rgba(11,95,222,0.1)", padding: "5px 10px",
              borderRadius: R.sm, border: "1px solid rgba(11,95,222,0.22)",
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: SIGNAL, display: "inline-block", boxShadow: `0 0 6px ${SIGNAL}` }} />
            {t("ctxBanner.tagline")}
          </span>
        </article>

        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener"
          className="flex flex-row flex-nowrap items-center justify-center gap-2 text-sm transition-all duration-200 hover:opacity-75"
          style={{
            ...MONO, fontSize: "11px", letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.3)", padding: "6px 0",
          }}
        >
          <Github className="h-4 w-4" />
          {t("ctxBanner.github")}
        </Link>
      </section>

      {/* ── Main copy ── */}
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-start relative z-10 leading-[1.05]"
        style={{ color: "#FFFFFF", letterSpacing: "-0.03em" }}
      >
        {t("ctxBanner.title")}
      </h2>
      <p
        className="text-sm md:text-base font-light mt-5 leading-relaxed text-start relative z-10"
        style={{ color: "rgba(255,255,255,0.48)", lineHeight: 1.75, maxWidth: "48ch" }}
      >
        {t("ctxBanner.description")}
      </p>

      {/* ── CTA ── */}
      <div className="relative inline-flex self-start  w-full items-start justify-start  mt-8 z-10">
        <button
          onClick={() => router.push(`/${locale}/ctx-frame`)}
          className="flex items-center gap-2"
          style={{
            background:   SIGNAL,
            color:        "#FFFFFF",
            fontWeight:   600,
            fontSize:     "13px",
            letterSpacing: "0.04em",
            padding:      "11px 26px",
            borderRadius: R.sm,
            border:       "none",
            transition:   "all 200ms cubic-bezier(0.4,0,0.2,1)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background  = SIGNAL_HOVER;
            el.style.transform   = "translateY(-1px)";
            el.style.boxShadow   = "0 0 24px rgba(11,95,222,0.35), 0 0 56px rgba(11,95,222,0.18)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = SIGNAL;
            el.style.transform  = "translateY(0)";
            el.style.boxShadow  = "none";
          }}
        >
          {t("ctxBanner.learnMore")}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ── Floating artifact cards ── */}
      <article className="absolute right-[-16px] bottom-[-60px] hidden md:block z-[1]">

        {/* Context file card — dark glass */}
        <div
          className="absolute overflow-hidden"
          style={{
            right: "200px", bottom: "90px",
            width: "210px",
            background:    "rgba(14,22,42,0.92)",
            border:        "1px solid rgba(255,255,255,0.09)",
            borderRadius:  R.md,
            boxShadow:     S.card,
            backdropFilter: "blur(20px)",
            transform:     "rotate(-3deg)",
          }}
        >
          {/* Chrome */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 12px",
            background: "rgba(255,255,255,0.025)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}>
            <div style={{ display: "flex", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F0A6A6" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F5C842" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#5CC878" }} />
            </div>
            <span style={{ ...MONO, fontSize: "9px", color: "rgba(255,255,255,0.25)", flex: 1, textAlign: "center" as const }}>
              payments.checkout.ctx
            </span>
            <span style={{ ...MONO, fontSize: "8px", color: SIGNAL, background: "rgba(11,95,222,0.14)", padding: "1px 6px", borderRadius: R.xs, border: "1px solid rgba(11,95,222,0.2)" }}>
              CTX
            </span>
          </div>
          <pre style={{ padding: "12px 14px", ...MONO, fontSize: "9px", lineHeight: 1.9, margin: 0 }}>
            {CONTEXT_LINES.map((line, i) => (
              <span key={i} className="block" style={{ color: getContextColor(line.type) }}>
                {line.text || "\u00A0"}
              </span>
            ))}
          </pre>
        </div>

        {/* Signal connector */}
        <div
          className="absolute z-10 flex flex-col items-center"
          style={{ right: "168px", bottom: "76px" }}
        >
          <div style={{ width: 1, height: 22, background: `linear-gradient(to bottom, transparent, ${SIGNAL})` }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: SIGNAL, boxShadow: `0 0 10px ${SIGNAL}, 0 0 22px rgba(11,95,222,0.4)` }} />
          <div style={{ width: 1, height: 10, background: `linear-gradient(to bottom, ${SIGNAL}, transparent)` }} />
        </div>

        {/* Generated code card — deep dark with signal glow */}
        <div
          className="absolute overflow-hidden"
          style={{
            right: "-10px", bottom: "20px",
            width: "220px",
            background:   "#060E1A",
            border:       "1px solid rgba(61,130,245,0.18)",
            borderRadius: R.sm,
            boxShadow:    S.code,
            transform:    "rotate(2deg)",
          }}
        >
          {/* Chrome */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "9px 12px",
            background: "rgba(255,255,255,0.02)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ display: "flex", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3D82F5", opacity: 0.55 }} />
            </div>
            <span style={{ ...MONO, fontSize: "9px", color: "rgba(255,255,255,0.2)", flex: 1, textAlign: "center" as const }}>
              checkout.ts — generated
            </span>
          </div>
          <pre style={{ padding: "12px 14px", ...MONO, fontSize: "9px", lineHeight: 1.9, margin: 0 }}>
            {CODE_LINES.map((line, i) => (
              <span key={i} className="block" style={{ color: getCodeColor(line.type) }}>
                {line.text || "\u00A0"}
              </span>
            ))}
          </pre>
        </div>

      </article>
    </article>
  );
}
