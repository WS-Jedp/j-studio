"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const SIGNAL       = "#0B5FDE";
const SIGNAL_HOVER = "#3D82F5";
const MONO         = { fontFamily: "'JetBrains Mono', 'Courier New', monospace" } as const;
const R            = { xs: "4px", sm: "8px", md: "12px" };

export function CTXFrameConcept({ scrollY }: { scrollY: number }) {
  const locale = useLocale();
  const t      = useTranslations("ctx-container");
  const router = useRouter();

  const translateY   = Math.min(scrollY * 0.03, 50);
  const scale        = 1 + Math.min(scrollY * 0.00002, 0.05);
  const opacityValue = Math.max(1 - scrollY * 0.0003, 0.5);

  return (
    <article
      className="relative flex flex-col items-start justify-between w-full md:w-auto row-span-2 md:row-auto h-full p-8 col-span-1 md:col-span-2 ease-linear transition-all duration-500 overflow-hidden"
      style={{
        background:   "#F7F5F0",
        borderRadius: "16px",
        boxShadow:    "0 2px 4px rgba(13,13,13,0.05), 0 8px 28px rgba(13,13,13,0.08), 0 0 0 1px rgba(13,13,13,0.04)",
        borderTop:    "2px solid rgba(11,95,222,0.2)",
        transform:    `translateY(${translateY}px) scale(${scale})`,
        opacity:      opacityValue,
        willChange:   "transform, opacity",
      }}
    >
      {/* Subtle rule-line texture */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to bottom, #D0CBC0 1px, transparent 1px)",
          backgroundSize:  "100% 32px",
          opacity:         0.22,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">
        <h2
          className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.15]"
          style={{ color: "#0D0D0D", letterSpacing: "-0.02em" }}
        >
          {t("ctxConcept.title")}
        </h2>
        <p
          className="text-sm font-light mt-5 leading-relaxed"
          style={{ color: "#4A4A4A", lineHeight: 1.75 }}
        >
          {t("ctxConcept.description")}
        </p>
      </div>

      {/* Workflow diagram */}
      <section className="relative z-10 w-full mt-8">
        {/* Traditional flow */}
        <div className="mb-5">
          <span
            className="block mb-2"
            style={{ ...MONO, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#8A8A8A" }}
          >
            {t("ctxConcept.label1")}
          </span>
          <div className="flex items-center gap-2 opacity-35">
            <FlowNode label={t("ctxConcept.step1")} />
            <ArrowRight className="h-3 w-3 flex-shrink-0" style={{ color: "#D0CBC0" }} />
            <FlowNode label="prompt" />
            <ArrowRight className="h-3 w-3 flex-shrink-0" style={{ color: "#D0CBC0" }} />
            <FlowNode label={t("ctxConcept.step3")} />
          </div>
        </div>

        {/* CDD flow */}
        <div>
          <span
            className="block mb-2"
            style={{ ...MONO, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: SIGNAL }}
          >
            {t("ctxConcept.label2")}
          </span>
          <div className="flex items-center gap-2">
            <FlowNode label={t("ctxConcept.step1")} />
            <ArrowRight className="h-3 w-3 flex-shrink-0" style={{ color: SIGNAL }} />
            <FlowNode label={t("ctxConcept.step2")} signal />
            <ArrowRight className="h-3 w-3 flex-shrink-0" style={{ color: SIGNAL }} />
            <FlowNode label={t("ctxConcept.step3")} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <button
        onClick={() => router.push(`/${locale}/ctx-frame`)}
        className="relative z-10 w-full mt-8 flex items-center justify-center gap-2 group"
        style={{
          background:   SIGNAL,
          color:        "#FFFFFF",
          fontWeight:   600,
          fontSize:     "13px",
          letterSpacing: "0.04em",
          padding:      "11px 24px",
          borderRadius: R.sm,
          border:       "none",
          transition:   "all 200ms cubic-bezier(0.4,0,0.2,1)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = SIGNAL_HOVER;
          el.style.transform  = "translateY(-1px)";
          el.style.boxShadow  = "0 0 20px rgba(11,95,222,0.30), 0 0 48px rgba(11,95,222,0.15)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = SIGNAL;
          el.style.transform  = "translateY(0)";
          el.style.boxShadow  = "none";
        }}
      >
        {t("ctxConcept.cta")}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </article>
  );
}

function FlowNode({ label, signal = false }: { label: string; signal?: boolean }) {
  return (
    <span
      style={{
        ...MONO,
        fontSize:    "10px",
        padding:     "4px 8px",
        borderRadius: "4px",
        border:      `1px solid ${signal ? "rgba(11,95,222,0.4)" : "#D0CBC0"}`,
        background:  signal ? "#E8F2FF" : "transparent",
        color:       signal ? SIGNAL : "#8A8A8A",
        whiteSpace:  "nowrap" as const,
      }}
    >
      {label}
    </span>
  );
}
