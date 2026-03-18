"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, ArrowRight } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { AnimatedSection } from "@/components/animations/section";
import { useLocale, useTranslations } from "next-intl";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  paper:       "#F7F5F0",
  paperDark:   "#EEEBE3",
  ink:         "#0D0D0D",
  lead:        "#4A4A4A",
  graphite:    "#8A8A8A",
  rule:        "#D0CBC0",
  signal:      "#0B5FDE",
  signalHover: "#3D82F5",
  signalLight: "#E8F2FF",
  signalDark:  "#0A50C0",
  void:        "#0A1628",
  string:      "#4D8FE8",
};
const DM   = { fontFamily: "'DM Sans', system-ui, sans-serif" as const };
const MONO = { fontFamily: "'JetBrains Mono', 'Courier New', monospace" as const };

// ─── Depth & radius tokens ────────────────────────────────────────────────────
const R = { xs: "4px", sm: "8px", md: "12px", lg: "16px", xl: "20px" };
const S = {
  sm:    "0 1px 2px rgba(13,13,13,0.04), 0 4px 12px rgba(13,13,13,0.05)",
  md:    "0 2px 4px rgba(13,13,13,0.05), 0 8px 28px rgba(13,13,13,0.07)",
  lg:    "0 4px 8px rgba(13,13,13,0.06), 0 16px 48px rgba(13,13,13,0.09)",
  xl:    "0 8px 16px rgba(13,13,13,0.08), 0 32px 80px rgba(13,13,13,0.12)",
  glow:  "0 0 0 1px rgba(11,95,222,0.18), 0 4px 24px rgba(11,95,222,0.18), 0 0 64px rgba(11,95,222,0.08)",
  dark:  "0 8px 24px rgba(0,0,0,0.3), 0 32px 80px rgba(0,0,0,0.4)",
};

// ─── Background wave canvas ──────────────────────────────────────────────────
function WaveCanvas({ opacity = 0.05, dark = false }: { opacity?: number; dark?: boolean }) {
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

    const colors = dark
      ? ["rgba(122,172,248,1)", "rgba(184,212,252,1)", "rgba(232,242,255,0.7)", "rgba(255,255,255,0.4)"]
      : ["#0B5FDE", "#3D82F5", "#7AACF8", "#B8D4FC"];

    function draw() {
      if (!ctx || !canvas) return;
      const W = canvas.width; const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      for (let w = 0; w < 4; w++) {
        const freq  = 0.008 + w * 0.004;
        const amp   = 30 + w * 15;
        const phase = w * Math.PI * 0.7 + tRef.current * (0.3 + w * 0.1);
        const y0    = H * (0.2 + w * 0.18);
        ctx.beginPath();
        for (let x = 0; x <= W; x += 2) {
          const y = y0 + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 1.7 + phase * 0.5) * (amp * 0.4);
          if (x === 0) { ctx.moveTo(x, y); } else { ctx.lineTo(x, y); }
        }
        ctx.strokeStyle = colors[w % colors.length];
        ctx.lineWidth   = 1.5;
        ctx.globalAlpha = Math.max(opacity - w * 0.008, 0);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      tRef.current += 0.005;
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, [opacity, dark]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ─── Hierarchy node tree canvas ───────────────────────────────────────────────
// Minimal, elegant: shows a vertical tree of nodes, active one highlighted.
// No expanding arcs — just a slow breathing glow on the active node.
function HierarchyCanvas({ activeLevel }: { activeLevel: number }) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const animRef    = useRef<number>(0);
  const tRef       = useRef(0);
  const activeLevelRef = useRef(activeLevel);

  useEffect(() => { activeLevelRef.current = activeLevel; }, [activeLevel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const LEVELS     = 5;
    const LEVEL_KINDS = ["app", "capability", "module", "feature", "spec"];

    function draw() {
      if (!ctx || !canvas) return;
      const W = canvas.width; const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const nodeSpacing = H / (LEVELS + 1);
      const cx          = W * 0.5;
      const active      = activeLevelRef.current;
      // Slow breath: period ~4s at 60fps
      const breath      = 0.5 + 0.5 * Math.sin(tRef.current * 0.025);

      for (let i = 0; i < LEVELS; i++) {
        const y        = nodeSpacing * (i + 1);
        const isActive = i === active;
        const isAbove  = i < active;   // propagation direction: top → down = app → spec
        const r        = isActive ? 6 : 3;

        // Connector line to next node
        if (i < LEVELS - 1) {
          ctx.beginPath();
          ctx.moveTo(cx, y + r);
          ctx.lineTo(cx, nodeSpacing * (i + 2) - (i + 1 === active ? 6 : 3));
          ctx.strokeStyle = isAbove ? "rgba(11,95,222,0.25)" : isActive ? "rgba(11,95,222,0.18)" : "rgba(255,255,255,0.07)";
          ctx.lineWidth   = 1;
          ctx.stroke();
        }

        // Active: soft breathing halo (single ring, very low opacity)
        if (isActive) {
          const haloR = 18 + breath * 6;
          ctx.beginPath();
          ctx.arc(cx, y, haloR, 0, Math.PI * 2);
          ctx.strokeStyle = "#0B5FDE";
          ctx.lineWidth   = 1;
          ctx.globalAlpha = 0.12 * (1 - breath);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Node fill
        ctx.beginPath();
        ctx.arc(cx, y, r, 0, Math.PI * 2);
        ctx.fillStyle   = isActive ? "#0B5FDE" : isAbove ? "rgba(11,95,222,0.3)" : "rgba(255,255,255,0.08)";
        ctx.globalAlpha = 1;
        ctx.fill();

        // Level label to the right of node
        ctx.font        = `400 9px 'JetBrains Mono', monospace`;
        ctx.fillStyle   = isActive ? "#3D82F5" : "rgba(255,255,255,0.18)";
        ctx.textAlign   = "left";
        ctx.globalAlpha = 1;
        ctx.fillText(LEVEL_KINDS[i].toUpperCase(), cx + 14, y + 3);
      }

      tRef.current++;
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

// ─── Workflow demo scenarios ──────────────────────────────────────────────────
const SCENARIOS = [
  {
    id: "base",
    contextLines: [
      { text: "module: payments.checkout", type: "value" },
      { text: 'intent: "Process a payment"', type: "value" },
      { text: "guardrails: []", type: "value" },
      { text: "depends_on: []", type: "value" },
    ],
    codeLines: [
      { text: "async function checkout(", type: "fn" },
      { text: "  amount: number", type: "param" },
      { text: ") {", type: "fn" },
      { text: "  const result = await stripe.charge(amount);", type: "value" },
      { text: "  return result;", type: "value" },
      { text: "}", type: "fn" },
    ],
  },
  {
    id: "kyc",
    contextLines: [
      { text: "module: payments.checkout", type: "value" },
      { text: 'intent: "Process a payment"', type: "value" },
      { text: "guardrails:", type: "key" },
      { text: '  - "Never process without KYC" # added', type: "added" },
      { text: '  - "Show fee before confirm"   # added', type: "added" },
      { text: "depends_on:", type: "key" },
      { text: "  - compliance.kyc              # added", type: "added" },
    ],
    codeLines: [
      { text: "async function checkout(", type: "fn" },
      { text: "  userId: string, amount: number", type: "param" },
      { text: ") {", type: "fn" },
      { text: "  // [CTX] compliance.kyc required", type: "comment" },
      { text: "  const kyc = await compliance.verify(userId);", type: "added" },
      { text: "  if (!kyc.verified) throw new KYCError();", type: "added" },
      { text: "", type: "empty" },
      { text: "  // [CTX] fee shown before confirm", type: "comment" },
      { text: "  const fee = await getFee(amount);", type: "added" },
      { text: "  await showFeeDialog(fee);", type: "added" },
      { text: "", type: "empty" },
      { text: "  return await stripe.charge(amount);", type: "value" },
      { text: "}", type: "fn" },
    ],
  },
  {
    id: "scope",
    contextLines: [
      { text: "module: payments.checkout", type: "value" },
      { text: 'intent: "Process a payment"', type: "value" },
      { text: "owns:", type: "key" },
      { text: '  - "checkout flow"    # explicit', type: "added" },
      { text: '  - "fee calculation"  # explicit', type: "added" },
      { text: "does_not_own:", type: "key" },
      { text: '  - "KYC logic"        # → compliance', type: "added" },
      { text: '  - "user profiles"    # → users', type: "added" },
      { text: "guardrails:", type: "key" },
      { text: '  - "Never process without KYC"', type: "string" },
      { text: '  - "Show fee before confirm"', type: "string" },
      { text: "depends_on:", type: "key" },
      { text: "  - compliance.kyc", type: "value" },
    ],
    codeLines: [
      { text: "// Scope boundary: KYC lives in compliance", type: "comment" },
      { text: "// This module only orchestrates checkout", type: "comment" },
      { text: "async function checkout(", type: "fn" },
      { text: "  userId: string, amount: number", type: "param" },
      { text: ") {", type: "fn" },
      { text: "  // Delegated to owner: compliance.kyc", type: "comment" },
      { text: "  await compliance.ensureKYC(userId);", type: "added" },
      { text: "", type: "empty" },
      { text: "  // Owned: fee calculation", type: "comment" },
      { text: "  const fee = await this.calculateFee(amount);", type: "value" },
      { text: "  await showFeeDialog(fee);", type: "value" },
      { text: "", type: "empty" },
      { text: "  return await stripe.charge(amount);", type: "value" },
      { text: "}", type: "fn" },
    ],
  },
  {
    id: "feature-body",
    contextLines: [
      { text: "---", type: "divider" },
      { text: "kind: feature", type: "key" },
      { text: "id: verso.learning.reading-session", type: "value" },
      { text: "module: verso.learning", type: "value" },
      { text: "category: product", type: "value" },
      { text: "feature_kind: ui", type: "value" },
      { text: "guardrails:", type: "key" },
      { text: '  - "Never interrupt an active session"', type: "string" },
      { text: '  - "No ads during reading"', type: "string" },
      { text: "---", type: "divider" },
      { text: "", type: "empty" },
      { text: "## Purpose", type: "heading" },
      { text: "Zero-friction reading session tracking.", type: "body" },
      { text: "", type: "empty" },
      { text: "## Flows", type: "heading" },
      { text: "1. User opens book → session starts silently", type: "body" },
      { text: "2. Timer runs in background, no UI", type: "body" },
      { text: "3. On close → progress committed", type: "body" },
      { text: "", type: "empty" },
      { text: "@src/learning/ReadingSession.ts:#@ctx:session-start", type: "pointer" },
    ],
    codeLines: [
      { text: "// #@ctx:session-start", type: "comment" },
      { text: "export function startSession(bookId: string) {", type: "fn" },
      { text: "  // [CTX] starts silently — no UI", type: "comment" },
      { text: "  const session = createSilentSession(bookId);", type: "added" },
      { text: "", type: "empty" },
      { text: "  // [CTX] guardrail: no ads during reading", type: "comment" },
      { text: "  adService.suspend();", type: "added" },
      { text: "", type: "empty" },
      { text: "  // [CTX] flow 2: timer runs in background", type: "comment" },
      { text: "  backgroundTimer.start(session.id);", type: "value" },
      { text: "  return session;", type: "value" },
      { text: "}", type: "fn" },
    ],
  },
  {
    id: "spec-algorithm",
    contextLines: [
      { text: "---", type: "divider" },
      { text: "kind: spec", type: "key" },
      { text: "feature: verso.learning.reading-session", type: "value" },
      { text: "status: active", type: "value" },
      { text: "---", type: "divider" },
      { text: "", type: "empty" },
      { text: "## Scope", type: "heading" },
      { text: "Timeout behavior for abandoned sessions.", type: "body" },
      { text: "", type: "empty" },
      { text: "## Algorithm", type: "heading" },
      { text: "1. Inactive > 30min → pause timer", type: "body" },
      { text: "2. Inactive > 2h → auto-commit progress", type: "body" },
      { text: "3. Never discard — always preserve last page", type: "body" },
      { text: "", type: "empty" },
      { text: "## Invariants", type: "heading" },
      { text: "- progress > 0 is always committed", type: "body" },
      { text: "- timer resumes on next open, same session", type: "body" },
    ],
    codeLines: [
      { text: "// [CTX spec] exact thresholds — do not change", type: "comment" },
      { text: "const PAUSE  = 30 * 60 * 1000;  // 30min", type: "added" },
      { text: "const COMMIT = 2 * 60 * 60 * 1000; // 2h", type: "added" },
      { text: "", type: "empty" },
      { text: "export function handleInactivity(s: Session) {", type: "fn" },
      { text: "  const idle = Date.now() - s.lastActivity;", type: "value" },
      { text: "", type: "empty" },
      { text: "  // [CTX] invariant: never discard", type: "comment" },
      { text: "  if (idle > COMMIT) {", type: "value" },
      { text: "    if (s.progress > 0) commitProgress(s);", type: "added" },
      { text: "    return;", type: "value" },
      { text: "  }", type: "value" },
      { text: "  if (idle > PAUSE) pauseTimer(s.id);", type: "value" },
      { text: "}", type: "fn" },
    ],
  },
];

function getContextColor(type: string) {
  switch (type) {
    case "key":     return C.signal;
    case "string":  return C.string;
    case "comment": return C.graphite;
    case "added":   return C.signal;
    case "divider": return C.rule;
    case "heading": return C.ink;
    case "body":    return C.lead;
    case "pointer": return C.signal;
    default:        return C.lead;
  }
}
function getContextStyle(type: string): React.CSSProperties {
  switch (type) {
    case "heading": return { fontWeight: 600 };
    case "pointer": return { textDecoration: "underline", textDecorationColor: C.rule };
    case "body":    return { fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "11px" };
    default:        return {};
  }
}
function getDarkCodeColor(type: string) {
  switch (type) {
    case "comment": return "rgba(122,172,248,0.6)";
    case "fn":      return "#7AACF8";
    case "param":   return "rgba(255,255,255,0.3)";
    case "added":   return "#3D82F5";
    default:        return "rgba(255,255,255,0.65)";
  }
}

// ─── Signal connector animation ───────────────────────────────────────────────
function SignalConnector({ trigger }: { trigger: number }) {
  return (
    <div className="hidden md:flex flex-col items-center justify-center gap-1 px-3 py-4 flex-shrink-0 relative" style={{ width: 56 }}>
      <motion.div
        key={trigger}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%", height: 1,
          background: `linear-gradient(to right, ${C.signal}, ${C.signalHover})`,
          transformOrigin: "left",
        }}
      />
      <motion.div
        key={`arr-${trigger}`}
        initial={{ x: -8, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute" }}
      >
        <ArrowRight size={12} style={{ color: C.signal }} />
      </motion.div>
      {/* Pulse dot */}
      <motion.div
        key={`pulse-${trigger}`}
        initial={{ scale: 2, opacity: 0.6 }}
        animate={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          position: "absolute",
          width: 8, height: 8,
          borderRadius: "50%",
          background: C.signal,
        }}
      />
    </div>
  );
}

// ─── Enhanced Workflow Demo ───────────────────────────────────────────────────
function WorkflowDemo() {
  const [active, setActive] = useState(0);
  const [transitionTrigger, setTransitionTrigger] = useState(0);
  const t = useTranslations("ctx-frame-page");
  const scenario  = SCENARIOS[active];
  const scenarios = t.raw("demo.scenarios") as Array<{ id: string; label: string; description: string }>;

  const selectScenario = useCallback((i: number) => {
    setActive(i);
    setTransitionTrigger(p => p + 1);
  }, []);

  return (
    <div className="w-full">
      {/* ── Scenario selector + description ── */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-8">
        {/* Vertical tabs on desktop */}
        <div className="flex flex-row md:flex-col flex-wrap md:flex-nowrap gap-2 md:min-w-[210px]">
          {scenarios.map((s, i) => (
            <button
              key={s.id}
              onClick={() => selectScenario(i)}
              className="text-left transition-all duration-150"
              style={{
                ...MONO,
                fontSize: "11px",
                letterSpacing: "0.06em",
                padding: "10px 16px",
                borderRadius: R.sm,
                background: active === i ? "rgba(11,95,222,0.12)" : "rgba(255,255,255,0.04)",
                color: active === i ? "#7AACF8" : "rgba(255,255,255,0.35)",
                border: `1px solid ${active === i ? "rgba(11,95,222,0.3)" : "rgba(255,255,255,0.07)"}`,
                boxShadow: active === i ? "0 0 0 1px rgba(11,95,222,0.15) inset" : "none",
                transition: "all 150ms ease",
              }}
            >
              <span className="block" style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 3, color: active === i ? "#3D82F5" : "rgba(255,255,255,0.2)", opacity: 1 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Description */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <span
                className="block mb-3"
                style={{ ...MONO, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: C.graphite }}
              >
                scenario {String(active + 1).padStart(2, "0")} / {scenarios.length}
              </span>
              <p
                style={{ fontSize: "17px", fontWeight: 300, color: C.lead, lineHeight: 1.7, maxWidth: "56ch", ...DM }}
              >
                {scenarios[active].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Split editor with signal connector ── */}
      <div
        className="flex flex-col md:flex-row overflow-hidden"
        style={{
          minHeight: 500,
          borderRadius: R.lg,
          boxShadow: S.dark,
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Context file panel */}
        <div
          className="flex flex-col flex-1 overflow-hidden"
          style={{ background: "#F2EDE5" }}
        >
          {/* Window chrome */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{
              background: "rgba(238,235,227,0.9)",
              borderBottom: `1px solid ${C.rule}`,
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-center gap-1.5">
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F0A6A6" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F5C842" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#5CC878" }} />
            </div>
            <span className="flex-1 text-center" style={{ ...MONO, fontSize: "10px", color: "#8A8070", letterSpacing: "0.06em" }}>
              {t("demo.contextLabel")}
            </span>
            <span
              style={{
                ...MONO, fontSize: "9px", color: C.signal,
                background: C.signalLight, padding: "3px 8px", letterSpacing: "0.1em",
                borderRadius: R.xs, border: "1px solid rgba(11,95,222,0.15)",
              }}
            >
              MARKDOWN
            </span>
          </div>

          {/* Code area */}
          <div className="p-6 flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {scenario.contextLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: line.type === "added" ? -6 : 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="flex items-baseline gap-3"
                    style={{
                      background: line.type === "added" ? "rgba(11,95,222,0.07)" : "transparent",
                      borderLeft: line.type === "added" ? `2px solid ${C.signal}` : "2px solid transparent",
                      paddingLeft: 6, paddingRight: 4, marginBottom: 1,
                    }}
                  >
                    <span style={{ ...MONO, fontSize: "9px", color: "#BDB8AE", minWidth: 20, textAlign: "right", userSelect: "none", flexShrink: 0 }}>
                      {i + 1}
                    </span>
                    <span style={{ ...MONO, fontSize: "12px", lineHeight: 1.9, color: getContextColor(line.type), ...getContextStyle(line.type) }}>
                      {line.text || "\u00A0"}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Signal connector */}
        <SignalConnector trigger={transitionTrigger} />

        {/* Generated code panel */}
        <div
          className="flex flex-col flex-1 overflow-hidden"
          style={{ background: "#0D1B2E", borderLeft: "1px solid rgba(255,255,255,0.05)" }}
        >
          {/* Window chrome */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-center gap-1.5">
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#3D82F5", opacity: 0.6 }} />
            </div>
            <span className="flex-1 text-center" style={{ ...MONO, fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em" }}>
              {t("demo.codeLabel")}
            </span>
            <span
              style={{
                ...MONO, fontSize: "9px", color: "#3D82F5",
                background: "rgba(11,95,222,0.15)", padding: "3px 8px", letterSpacing: "0.1em",
                borderRadius: R.xs, border: "1px solid rgba(11,95,222,0.2)",
              }}
            >
              TS
            </span>
          </div>

          {/* Code area */}
          <div className="p-6 flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {scenario.codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: line.type === "added" ? -6 : 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 + i * 0.03 }}
                    className="flex items-baseline gap-3"
                    style={{
                      background: line.type === "added" ? "rgba(11,95,222,0.14)" : "transparent",
                      borderLeft: line.type === "added" ? "2px solid #3D82F5" : "2px solid transparent",
                      paddingLeft: 6, paddingRight: 4, marginBottom: 1,
                    }}
                  >
                    <span style={{ ...MONO, fontSize: "9px", color: "rgba(255,255,255,0.15)", minWidth: 20, textAlign: "right", userSelect: "none", flexShrink: 0 }}>
                      {i + 1}
                    </span>
                    <span style={{ ...MONO, fontSize: "12px", lineHeight: 1.9, color: getDarkCodeColor(line.type) }}>
                      {line.text || "\u00A0"}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-5 mt-4">
        {[
          { color: C.signalLight, border: C.signal, label: "context guardrail applied" },
          { color: "rgba(11,95,222,0.14)", border: "#3D82F5", label: "AI generated from context" },
        ].map(({ color, border, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div style={{ width: 10, height: 10, background: color, borderLeft: `2px solid ${border}` }} />
            <span style={{ ...MONO, fontSize: "9px", color: C.graphite }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div
      className="flex items-center gap-4 mb-10"
      style={{ borderBottom: `1px solid ${light ? "rgba(255,255,255,0.1)" : C.rule}`, paddingBottom: "12px" }}
    >
      <span style={{ ...MONO, fontSize: "10px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: light ? "rgba(255,255,255,0.3)" : C.graphite }}>
        {children}
      </span>
    </div>
  );
}

// ─── Decorative section number ─────────────────────────────────────────────────
function DecorativeNum({ n, light = false }: { n: string; light?: boolean }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute", right: -4, top: -40,
        fontSize: "200px", fontWeight: 700,
        color: light ? "#FFFFFF" : C.ink,
        opacity: light ? 0.03 : 0.04,
        lineHeight: 1, letterSpacing: "-0.05em",
        userSelect: "none", pointerEvents: "none",
        ...DM,
      }}
    >
      {n}
    </span>
  );
}

// ─── CTA button ────────────────────────────────────────────────────────────────
function CTABtn({
  children, onClick, href, variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost";
}) {
  const baseStyle: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8,
    fontWeight: 600, fontSize: "13px", letterSpacing: "0.06em",
    padding: "12px 28px", border: "none", cursor: "pointer",
    borderRadius: R.sm,
    transition: "all 200ms cubic-bezier(0.4,0,0.2,1)",
    ...DM,
  };
  const primary: React.CSSProperties = { background: C.signal, color: "#FFFFFF" };
  const ghost: React.CSSProperties   = { background: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: R.sm };
  const style = { ...baseStyle, ...(variant === "primary" ? primary : ghost) };

  const handlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      if (variant === "primary") {
        el.style.background  = C.signalHover;
        el.style.transform   = "translateY(-1px)";
        el.style.boxShadow   = "0 0 24px rgba(11,95,222,0.35), 0 0 56px rgba(11,95,222,0.18)";
      } else {
        el.style.color  = "#FFFFFF";
        el.style.borderColor = "rgba(255,255,255,0.3)";
      }
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      if (variant === "primary") {
        el.style.background = C.signal;
        el.style.transform  = "translateY(0)";
        el.style.boxShadow  = "none";
      } else {
        el.style.color      = "rgba(255,255,255,0.5)";
        el.style.borderColor = "rgba(255,255,255,0.1)";
      }
    },
  };

  if (href) {
    return <Link href={href} style={style} {...handlers}>{children}</Link>;
  }
  return <button onClick={onClick} style={style} {...handlers}>{children}</button>;
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function CTXFramePage() {
  const locale = useLocale();
  const t      = useTranslations("ctx-frame-page");
  const { ref: sectionRef, scrollY } = useParallax();

  const [activeHierarchyLevel, setActiveHierarchyLevel] = useState(3); // "feature" default

  const gapItems     = t.raw("gap.missing.items") as Array<{ title: string; body: string }>;
  const existsItems  = t.raw("gap.exists.items") as string[];
  const problemLines = t.raw("problem.lines") as string[];
  const pillars      = t.raw("cdd.pillars") as Array<{ num: string; title: string; body: string }>;
  const hierarchy    = t.raw("hierarchy.levels") as Array<{ kind: string; name: string; desc: string; question: string }>;

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col justify-start min-h-screen"
      style={{ background: C.paper, ...DM }}
    >
      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <Link
        href={`/${locale}`}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 transition-all duration-200"
        style={{ color: C.graphite, ...MONO, fontSize: "12px", letterSpacing: "0.06em", padding: "8px 0" }}
      >
        <ArrowLeft size={14} />
        <span>{t("navigation.back")}</span>
      </Link>

      {/* ══ HERO — void dark ════════════════════════════════════════════════ */}
      <header
        className="w-full min-h-screen flex flex-col relative overflow-hidden"
        style={{ background: C.void }}
      >
        {/* Background waves — very subtle */}
        <WaveCanvas opacity={0.07} dark />

        {/* Dot grid overlay — fades toward left so it frames the artifact */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.042) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 90% 70% at 68% 50%, black 0%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 68% 50%, black 0%, transparent 72%)",
          }}
        />

        {/* Signal ambient glow — sits behind the artifact */}
        <div
          className="absolute pointer-events-none"
          style={{
            right: "8%", top: "50%", transform: "translate(0, -50%)",
            width: 660, height: 660,
            background: "radial-gradient(circle, rgba(11,95,222,0.1) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />

        {/* Left accent rule */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent, rgba(11,95,222,0.45) 40%, rgba(11,95,222,0.08))` }}
        />

        {/* ── Main content: split layout ── */}
        <div
          className="relative z-10 w-full flex-1 flex items-center"
          style={{ padding: "clamp(80px,10vw,120px) clamp(24px,5vw,80px) clamp(100px,12vw,160px)" }}
        >
          <div
            className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 xl:gap-16 items-center"
            style={{ maxWidth: 1180, margin: "0 auto" }}
          >

            {/* ── Left: typography ── */}
            <div className="md:col-span-5">

              {/* Product badge */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ marginBottom: 32 }}
              >
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  ...MONO, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase" as const,
                  color: C.signal, background: "rgba(11,95,222,0.1)", padding: "6px 14px",
                  borderRadius: R.sm, border: "1px solid rgba(11,95,222,0.22)",
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.signal, display: "inline-block", boxShadow: `0 0 6px ${C.signal}` }} />
                  {t("hero.tagline")}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "clamp(52px, 7vw, 96px)",
                  fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 0.9,
                  color: "#FFFFFF", marginBottom: 20,
                  transform: `translateY(${scrollY * 0.06}px)`,
                  opacity: Math.max(0, 1 - scrollY * 0.0009),
                }}
              >
                {t("hero.title")}
              </motion.h1>

              {/* Italic tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                style={{ fontSize: "15px", fontWeight: 300, fontStyle: "italic", color: C.signal, marginBottom: 28, ...DM }}
              >
                Context before code.
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: "15px", fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,0.42)", maxWidth: "42ch", marginBottom: 40 }}
              >
                {t("hero.description")}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="flex flex-wrap items-center gap-4"
              >
                <a
                  href="#demo"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: C.signal, color: "#FFFFFF",
                    ...DM, fontWeight: 600, fontSize: "13px", letterSpacing: "0.04em",
                    padding: "12px 24px", borderRadius: R.sm,
                    transition: "all 200ms ease", textDecoration: "none",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = C.signalHover;
                    el.style.boxShadow = "0 0 32px rgba(11,95,222,0.4)";
                    el.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = C.signal;
                    el.style.boxShadow = "none";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {t("hero.ctaDemo")} <ArrowRight size={13} />
                </a>
                <Link
                  href="https://github.com"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    color: "rgba(255,255,255,0.4)", background: "transparent",
                    ...DM, fontWeight: 500, fontSize: "13px",
                    padding: "12px 20px", borderRadius: R.sm,
                    border: "1px solid rgba(255,255,255,0.1)",
                    transition: "all 200ms ease", textDecoration: "none",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "#FFFFFF";
                    el.style.borderColor = "rgba(255,255,255,0.22)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "rgba(255,255,255,0.4)";
                    el.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                >
                  <Github size={14} />
                  GitHub
                </Link>
              </motion.div>
            </div>

            {/* ── Right: floating artifact ── */}
            <div
              className="hidden md:flex md:col-span-7 items-center justify-end relative"
              style={{ height: 460 }}
            >
              {/* Context file card — top-left */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1.1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute", left: 0, top: 0,
                  width: "66%",
                  background: "rgba(14,22,42,0.88)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: R.lg,
                  boxShadow: "0 20px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
                  backdropFilter: "blur(20px)",
                  overflow: "hidden",
                  zIndex: 1,
                }}
              >
                {/* Chrome */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "11px 16px",
                  background: "rgba(255,255,255,0.025)",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#F0A6A6" }} />
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#F5C842" }} />
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#5CC878" }} />
                  </div>
                  <span style={{ ...MONO, fontSize: "10px", color: "rgba(255,255,255,0.25)", flex: 1, textAlign: "center" as const }}>
                    payments.checkout.ctx
                  </span>
                  <span style={{ ...MONO, fontSize: "9px", color: C.signal, background: "rgba(11,95,222,0.14)", padding: "2px 8px", borderRadius: R.xs, border: "1px solid rgba(11,95,222,0.2)" }}>
                    CTX
                  </span>
                </div>
                {/* Code lines */}
                <div style={{ padding: "18px 22px", ...MONO, fontSize: "12px", lineHeight: 2.1 }}>
                  {([
                    { text: "module: payments.checkout", color: "rgba(255,255,255,0.45)", delay: 0.85 },
                    { text: 'intent: "Process a payment"', color: "rgba(255,255,255,0.45)", delay: 0.95 },
                    { text: "guardrails:", color: C.signal, delay: 1.05 },
                    { text: '  - "Never process without KYC"', color: C.string, delay: 1.15 },
                    { text: '  - "Show fee before confirm"', color: C.string, delay: 1.25 },
                    { text: "depends_on:", color: C.signal, delay: 1.35 },
                    { text: "  - compliance.kyc", color: "rgba(255,255,255,0.3)", delay: 1.45 },
                  ] as Array<{ text: string; color: string; delay: number }>).map(({ text, color, delay }, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay }}
                    >
                      <span style={{ color }}>{text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Signal connector between the two cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.4 }}
                style={{
                  position: "absolute",
                  left: "calc(66% - 18px)", bottom: "calc(50% - 40px)",
                  zIndex: 3,
                  display: "flex", flexDirection: "column" as const, alignItems: "center",
                }}
              >
                <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, transparent, ${C.signal})` }} />
                <div style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: C.signal,
                  boxShadow: `0 0 14px ${C.signal}, 0 0 28px rgba(11,95,222,0.4)`,
                }} />
                <div style={{ width: 1, height: 16, background: `linear-gradient(to bottom, ${C.signal}, transparent)` }} />
              </motion.div>

              {/* Generated code card — offset right-bottom */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute", right: 0, bottom: 0,
                  width: "60%",
                  background: "#060E1A",
                  border: "1px solid rgba(61,130,245,0.18)",
                  borderRadius: R.md,
                  boxShadow: "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(61,130,245,0.07), 0 0 36px rgba(11,95,222,0.07)",
                  overflow: "hidden",
                  zIndex: 2,
                }}
              >
                {/* Chrome */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 14px",
                  background: "rgba(255,255,255,0.02)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3D82F5", opacity: 0.55 }} />
                  </div>
                  <span style={{ ...MONO, fontSize: "10px", color: "rgba(255,255,255,0.2)", flex: 1, textAlign: "center" as const }}>
                    checkout.ts — generated
                  </span>
                </div>
                {/* Code */}
                <div style={{ padding: "16px 20px", ...MONO, fontSize: "11px", lineHeight: 2 }}>
                  {([
                    { text: "// [CTX] compliance.kyc required", color: "rgba(122,172,248,0.5)", delay: 1.6 },
                    { text: "const kyc = await compliance", color: "#7AACF8", delay: 1.7 },
                    { text: "  .verify(userId);", color: "#7AACF8", delay: 1.75 },
                    { text: "if (!kyc.verified)", color: "rgba(255,255,255,0.45)", delay: 1.82 },
                    { text: "  throw new KYCError();", color: "#3D82F5", delay: 1.88 },
                    { text: "", color: "transparent", delay: 1.92 },
                    { text: "return await stripe.charge(amount);", color: "rgba(255,255,255,0.38)", delay: 1.97 },
                  ] as Array<{ text: string; color: string; delay: number }>).map(({ text, color, delay }, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25, delay }}
                    >
                      <span style={{ color }}>{text || "\u00A0"}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Gradient handoff to paper */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: "32%", background: `linear-gradient(to top, ${C.paper} 0%, transparent 100%)` }}
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1 }}
          className="absolute bottom-10 right-12 flex items-center gap-3"
          style={{ zIndex: 10 }}
        >
          <div style={{ width: 36, height: 1, background: "rgba(255,255,255,0.15)" }} />
          <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.22)" }}>scroll</span>
        </motion.div>
      </header>

      {/* ══ MAIN CONTENT ═════════════════════════════════════════════════════ */}
      <main
        className="mx-auto w-full"
        style={{ maxWidth: "1180px", padding: "0 clamp(24px, 4.5vw, 80px) 160px" }}
      >
        <div className="grid grid-cols-1 gap-y-32 mt-0">

          {/* ── THESIS ─────────────────────────────────────────────────────── */}
          <AnimatedSection className="col-span-full" animation="fadeIn">
            <div style={{ height: 1, background: C.rule, margin: "80px 0" }} />
            <blockquote
              className="max-w-4xl mx-auto text-center"
              style={{
                fontSize: "clamp(22px, 3vw, 34px)",
                fontWeight: 300, fontStyle: "italic",
                lineHeight: 1.4, color: C.lead,
              }}
            >
              &ldquo;{t("thesis.quote")}&rdquo;
            </blockquote>
            <div style={{ height: 1, background: C.rule, margin: "80px 0" }} />
          </AnimatedSection>

          {/* ── 01 THE GAP ─────────────────────────────────────────────────── */}
          <AnimatedSection className="col-span-full" animation="fadeUp">
            <div style={{ position: "relative" }}>
              <DecorativeNum n="01" />
              <SectionLabel>{t("gap.sectionTitle")}</SectionLabel>

              {/* Asymmetric 7/5 layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
                <div className="md:col-span-7">
                  <h2
                    className="mb-8 leading-tight"
                    style={{ fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 700, letterSpacing: "-0.03em", color: C.ink }}
                  >
                    {t("gap.title").split("Never")[0]}
                    <br />
                    <span style={{ color: C.signal }}>Never the why.</span>
                  </h2>

                  <div
                    style={{ borderLeft: `3px solid ${C.signal}`, padding: "24px 32px", background: C.signalLight, marginBottom: 0, borderRadius: R.md, boxShadow: S.sm }}
                  >
                    <p style={{ fontSize: "17px", fontWeight: 300, fontStyle: "italic", color: C.ink, lineHeight: 1.6 }}>
                      {t("gap.halfMap")}
                    </p>
                  </div>
                </div>
                <div className="md:col-span-5 md:col-start-8 md:mt-16">
                  {/* Decorative empty space — intentional rightward tension */}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Exists */}
                <div style={{ background: "#FFFFFF", border: `1px solid ${C.rule}`, padding: "36px", borderRadius: R.md, boxShadow: S.md }}>
                  <span className="block mb-6 pb-4" style={{ ...MONO, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.graphite, borderBottom: `1px solid ${C.rule}` }}>
                    {t("gap.exists.label")}
                  </span>
                  <div className="flex flex-col gap-3">
                    {existsItems.map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <div style={{ width: 4, height: 4, background: C.rule, flexShrink: 0 }} />
                        <span style={{ ...MONO, fontSize: "13px", color: C.graphite }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing */}
                <div style={{ background: C.signalLight, border: "1px solid rgba(11,95,222,0.2)", padding: "36px", borderRadius: R.md, boxShadow: S.glow }}>
                  <span className="block mb-6 pb-4" style={{ ...MONO, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.signal, borderBottom: "1px solid rgba(11,95,222,0.15)" }}>
                    {t("gap.missing.label")}
                  </span>
                  <div className="flex flex-col gap-3">
                    {gapItems.map((item, i: number) => (
                      <div key={i} style={{ padding: "12px 16px", border: "1px solid rgba(11,95,222,0.12)", background: "#FFFFFF", borderRadius: R.sm, boxShadow: S.sm }}>
                        <span className="block mb-0.5" style={{ fontSize: "13px", fontWeight: 500, color: C.ink }}>{item.title}</span>
                        <span style={{ fontSize: "12px", color: C.graphite }}>{item.body}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── 02 THE PROBLEM ─────────────────────────────────────────────── */}
          <AnimatedSection className="col-span-full" animation="fadeUp">
            <div style={{ position: "relative" }}>
              <DecorativeNum n="02" />
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-8 md:col-start-3">
                  <SectionLabel>{t("problem.sectionTitle")}</SectionLabel>
                  <h2 className="mb-4 leading-tight" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", color: C.ink }}>
                    {t("problem.title")}
                  </h2>
                  <p className="mb-10" style={{ fontSize: "22px", fontWeight: 500, color: C.signal }}>
                    {t("problem.subtitle")}
                  </p>
                  <p className="mb-10 leading-relaxed" style={{ fontSize: "17px", fontWeight: 300, color: C.lead, lineHeight: 1.7 }}>
                    {t("problem.body")}
                  </p>

                  <div style={{ border: `1px solid ${C.rule}`, borderRadius: R.lg, overflow: "hidden", boxShadow: S.sm }}>
                    {problemLines.map((line: string, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        style={{
                          padding: "22px 28px",
                          borderBottom: i < problemLines.length - 1 ? `1px solid ${C.rule}` : "none",
                          background: C.paper,
                          fontSize: "15px", fontWeight: 300, color: C.lead, lineHeight: 1.65,
                        }}
                      >
                        {line}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8" style={{ borderLeft: `3px solid ${C.signal}`, padding: "24px 32px", background: C.signalLight, borderRadius: R.md, boxShadow: S.sm }}>
                    <p style={{ fontSize: "17px", fontWeight: 300, fontStyle: "italic", color: C.ink, lineHeight: 1.6 }}>
                      {t("problem.conclusion")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── 03 CDD — THE INVERSION ─────────────────────────────────────── */}
          <AnimatedSection className="col-span-full" animation="fadeUp">
            <div style={{ position: "relative" }}>
              <DecorativeNum n="03" />
              <SectionLabel>{t("cdd.sectionTitle")}</SectionLabel>
              <h2 className="mb-6 leading-tight" style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 700, letterSpacing: "-0.03em", color: C.ink }}>
                {t("cdd.title")}
              </h2>
              <p className="mb-16 max-w-2xl" style={{ fontSize: "17px", fontWeight: 300, color: C.lead, lineHeight: 1.7 }}>
                {t("cdd.subtitle")}
              </p>

              {/* Flow comparison */}
              <div style={{ border: `1px solid ${C.rule}`, borderRadius: R.lg, overflow: "hidden", boxShadow: S.md }} className="mb-10">
                <div className="opacity-40" style={{ padding: "28px 32px", borderBottom: `1px solid ${C.rule}` }}>
                  <span className="block mb-4" style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.graphite }}>
                    {t("cdd.traditional.label")}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {(t.raw("cdd.traditional.steps") as string[]).map((step: string, i: number, arr: string[]) => (
                      <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ ...MONO, fontSize: "12px", padding: "6px 14px", border: `1px solid ${C.rule}`, background: C.paperDark, color: C.graphite }}>{step}</span>
                        {i < arr.length - 1 && <ArrowRight size={12} style={{ color: C.rule, flexShrink: 0 }} />}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: "28px 32px", background: C.signalLight }}>
                  <span className="block mb-4" style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.signal }}>
                    {t("cdd.new.label")}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {(t.raw("cdd.new.steps") as string[]).map((step: string, i: number, arr: string[]) => (
                      <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ ...MONO, fontSize: "12px", padding: "6px 14px", border: `1px solid ${i === 1 ? "rgba(11,95,222,0.4)" : "rgba(11,95,222,0.2)"}`, background: i === 1 ? C.signal : "rgba(255,255,255,0.6)", color: i === 1 ? "#FFFFFF" : C.signal }}>{step}</span>
                        {i < arr.length - 1 && <ArrowRight size={12} style={{ color: C.signal, flexShrink: 0, opacity: 0.5 }} />}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-16" style={{ borderLeft: `3px solid ${C.signal}`, padding: "24px 32px", background: C.signalLight, borderRadius: R.md, boxShadow: S.sm }}>
                <p style={{ fontSize: "clamp(19px, 2.5vw, 26px)", fontWeight: 300, fontStyle: "italic", color: C.ink, lineHeight: 1.4 }}>
                  {t("cdd.insight")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {pillars.map((p, i: number) => (
                  <motion.div
                    key={p.num}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    style={{ background: C.paper, padding: "36px", border: `1px solid ${C.rule}`, borderRadius: R.md, boxShadow: S.md }}
                  >
                    <span className="block mb-4" style={{ ...MONO, fontSize: "10px", color: C.signal, letterSpacing: "0.1em" }}>
                      {p.num} —
                    </span>
                    <h3 className="mb-3" style={{ fontSize: "20px", fontWeight: 600, color: C.ink, letterSpacing: "-0.01em" }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: "14px", fontWeight: 300, color: C.lead, lineHeight: 1.65 }}>
                      {p.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>

      {/* ══ 04 INTERACTIVE DEMO — full-bleed void dark ══════════════════════ */}
      <div id="demo" className="w-full relative overflow-hidden" style={{ background: C.void, padding: "clamp(64px,8vw,120px) 0" }}>
        <WaveCanvas opacity={0.08} dark />

        {/* Left accent */}
        <div className="absolute left-0 top-0 bottom-0 w-px pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, rgba(11,95,222,0.4) 50%, transparent)` }} />

        <div className="relative z-10 mx-auto" style={{ maxWidth: "1180px", padding: "0 clamp(24px, 4.5vw, 80px)" }}>
          <div style={{ position: "relative" }}>
            <DecorativeNum n="04" light />
            <SectionLabel light>{t("demo.sectionTitle")}</SectionLabel>

            {/* Section header — 7/5 split */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-14">
              <div className="md:col-span-7">
                <h2 className="mb-5 leading-tight" style={{ fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#FFFFFF" }}>
                  {t("demo.title")}
                </h2>
                <p style={{ fontSize: "17px", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: "52ch" }}>
                  {t("demo.subtitle")}
                </p>
              </div>
            </div>

            {/* THE DEMO — main event */}
            <WorkflowDemo />
          </div>
        </div>
      </div>

      {/* ══ REMAINING SECTIONS ═══════════════════════════════════════════════ */}
      <main
        className="mx-auto w-full"
        style={{ maxWidth: "1180px", padding: "0 clamp(24px, 4.5vw, 80px) 160px" }}
      >
        <div className="grid grid-cols-1 gap-y-32 mt-32">

          {/* ── 05 HIERARCHY — interactive with ripple canvas ────────────── */}
          <AnimatedSection className="col-span-full" animation="fadeUp">
            <div style={{ position: "relative" }}>
              <DecorativeNum n="05" />
              <SectionLabel>{t("hierarchy.sectionTitle")}</SectionLabel>

              {/* 7/5 layout: list left, canvas right */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-0">
                <div className="md:col-span-7">
                  <h2 className="mb-4 leading-tight" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", color: C.ink }}>
                    {t("hierarchy.title")}
                  </h2>
                  <p className="mb-10" style={{ fontSize: "16px", fontWeight: 300, color: C.lead, lineHeight: 1.7 }}>
                    {t("hierarchy.subtitle")}
                  </p>

                  <div style={{ border: `1px solid ${C.rule}`, borderRadius: R.lg, overflow: "hidden", boxShadow: S.md }}>
                    {hierarchy.map((level, i: number) => (
                      <motion.div
                        key={level.kind}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        viewport={{ once: true, margin: "-40px" }}
                        onClick={() => setActiveHierarchyLevel(i)}
                        style={{
                          padding: "20px 24px",
                          borderBottom: i < hierarchy.length - 1 ? `1px solid ${C.rule}` : "none",
                          background: activeHierarchyLevel === i ? C.signalLight : i % 2 === 0 ? C.paper : C.paperDark,
                          borderLeft: `3px solid ${activeHierarchyLevel === i ? C.signal : "transparent"}`,
                          transition: "background 0.2s ease, border-color 0.2s ease",
                          cursor: "pointer",
                        }}
                      >
                        {/* Row 1: kind tag + question */}
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <span style={{ ...MONO, fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: activeHierarchyLevel === i ? C.signal : C.graphite }}>
                            {level.kind}
                          </span>
                          <span style={{ ...MONO, fontSize: "10px", color: C.graphite, lineHeight: 1.4, textAlign: "right" as const, maxWidth: "55%" }}>
                            {level.question}
                          </span>
                        </div>
                        {/* Row 2: name */}
                        <span className="block mb-1" style={{ fontSize: "16px", fontWeight: 600, color: C.ink, letterSpacing: "-0.01em" }}>
                          {level.name}
                        </span>
                        {/* Row 3: description */}
                        <span style={{ fontSize: "13px", fontWeight: 300, color: C.graphite, lineHeight: 1.6 }}>
                          {level.desc}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Ripple canvas */}
                <div className="hidden md:flex md:col-span-5 flex-col" style={{ minHeight: 400 }}>
                  <div
                    className="flex-1 relative overflow-hidden"
                    style={{ background: C.void, border: `1px solid rgba(255,255,255,0.06)`, borderRadius: R.lg, overflow: "hidden" }}
                  >
                    <HierarchyCanvas activeLevel={activeHierarchyLevel} />
                    <div className="absolute inset-0 flex items-end p-5 pointer-events-none">
                      <span style={{ ...MONO, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
                        {hierarchy[activeHierarchyLevel]?.kind} — {hierarchy[activeHierarchyLevel]?.question}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── 06 NOT DOCS ─────────────────────────────────────────────────── */}
          <AnimatedSection className="col-span-full" animation="fadeUp">
            <div style={{ position: "relative" }}>
              <DecorativeNum n="06" />
              <SectionLabel>{t("notDocs.sectionTitle")}</SectionLabel>
              <h2 className="mb-6 leading-tight" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", color: C.ink }}>
                {t("notDocs.title").split("Executable")[0]}
                <span style={{ color: C.signal }}>Executable</span>
                {t("notDocs.title").split("Executable")[1]}
              </h2>
              <p className="mb-10 max-w-2xl" style={{ fontSize: "16px", fontWeight: 300, color: C.lead, lineHeight: 1.7 }}>
                {t("notDocs.body")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ border: `1px solid ${C.rule}`, borderRadius: R.lg, overflow: "hidden", boxShadow: S.md }}>
                {/* Docs — dimmed */}
                <div style={{ background: C.paper, padding: "40px", opacity: 0.5, borderRight: `1px solid ${C.rule}` }}>
                  <span className="block mb-5 pb-4" style={{ ...MONO, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.graphite, borderBottom: `1px solid ${C.rule}` }}>
                    {t("notDocs.docs.label")}
                  </span>
                  <h3 className="mb-3" style={{ fontSize: "22px", fontWeight: 600, color: C.ink, letterSpacing: "-0.01em" }}>
                    {t("notDocs.docs.title")}
                  </h3>
                  <p className="mb-6" style={{ fontSize: "14px", fontWeight: 300, color: C.lead, lineHeight: 1.65 }}>
                    {t("notDocs.docs.body")}
                  </p>
                  <div style={{ background: C.paperDark, border: `1px solid ${C.rule}`, padding: "16px 20px", ...MONO, fontSize: "12px", lineHeight: 2, color: C.graphite, borderRadius: R.sm }}>
                    <span className="block"># PaymentService</span>
                    <span className="block">Handles payment processing</span>
                    <span className="block">and settlement logic.</span>
                  </div>
                </div>

                {/* CTX — signal */}
                <div style={{ background: C.signalLight, padding: "40px", borderLeft: "none" }}>
                  <span className="block mb-5 pb-4" style={{ ...MONO, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.signal, borderBottom: "1px solid rgba(11,95,222,0.15)" }}>
                    {t("notDocs.ctx.label")}
                  </span>
                  <h3 className="mb-3" style={{ fontSize: "22px", fontWeight: 600, color: C.ink, letterSpacing: "-0.01em" }}>
                    {t("notDocs.ctx.title")}
                  </h3>
                  <p className="mb-6" style={{ fontSize: "14px", fontWeight: 300, color: C.lead, lineHeight: 1.65 }}>
                    {t("notDocs.ctx.body")}
                  </p>
                  <div style={{ background: C.paper, border: "1px solid rgba(11,95,222,0.15)", padding: "16px 20px", ...MONO, fontSize: "12px", lineHeight: 2, borderRadius: R.sm, boxShadow: S.sm }}>
                    <span className="block" style={{ color: C.signal }}>guardrails:</span>
                    <span className="block" style={{ color: C.string }}>  - &quot;Never process without KYC&quot;</span>
                    <span className="block" style={{ color: C.signal }}>depends_on:</span>
                    <span className="block" style={{ color: C.lead }}>  - compliance.kyc</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── 07 CLOSING ─────────────────────────────────────────────────── */}
          <AnimatedSection className="col-span-full" animation="fadeUp">
            <div style={{ position: "relative" }}>
              <DecorativeNum n="07" />
              <SectionLabel>{t("closing.sectionTitle")}</SectionLabel>

              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-8">
                  <h2 className="mb-10 leading-tight" style={{ fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 700, letterSpacing: "-0.04em", color: C.ink }}>
                    {t("closing.title0")}{" "}
                    <span style={{ color: C.signal }}>{t("closing.title1")}</span>{" "}
                    {t("closing.title2")}{" "}
                    <span
                      style={{
                        display: "inline-block",
                        borderBottom: `3px solid ${C.signal}`,
                        paddingBottom: 2,
                      }}
                    >
                      {t("closing.title3")}
                    </span>
                  </h2>
                  <p className="mb-12 max-w-xl" style={{ fontSize: "17px", fontWeight: 300, color: C.lead, lineHeight: 1.7 }}>
                    {t("closing.body")}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <CTABtn href="https://github.com" variant="primary">
                      <Github size={14} />
                      {t("closing.github")}
                    </CTABtn>
                    <Link
                      href={`/${locale}/ctx-frame`}
                      className="inline-flex items-center gap-2 transition-all duration-200"
                      style={{ ...MONO, fontSize: "12px", color: C.graphite, letterSpacing: "0.06em", padding: "12px 0" }}
                    >
                      {t("closing.readNarrative")}
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer rule */}
              <div style={{ height: 1, background: C.rule, margin: "96px 0 0" }} />
              <div className="flex items-center justify-between pt-5">
                <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: C.graphite }}>CTX Frame</span>
                <span style={{ fontStyle: "italic", fontSize: "13px", fontWeight: 300, color: C.graphite }}>Context before code.</span>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </main>
    </section>
  );
}
