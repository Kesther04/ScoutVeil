import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Radar } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../shared/components/Logo";

/* ------------------------------------------------------------------ */
/*  Fallback / "coming soon" page — reuses ScoutVeil's dark-void +      */
/*  amber-signal tokens, grid texture, and glow accents from Home.tsx   */
/* ------------------------------------------------------------------ */

export default function Fallback(): ReactElement {
  return (
    <main className="relative min-h-screen bg-[#0B0D14] antialiased selection:bg-[#E8A64A]/30 flex flex-col overflow-hidden">
      {/* Restrained glow accents — consistent with Hero */}
      <div className="absolute -top-24 -right-16 w-[500px] h-[500px] rounded-full bg-[#E8A64A]/8 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-[360px] h-[360px] rounded-full bg-[#E8A64A]/5 blur-[100px] pointer-events-none" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Minimal header, consistent with Nav branding */}
      <header className="relative z-10 px-6 h-18 flex items-center">
        <div className="max-w-362.5 mx-auto w-full flex items-center">
          <Logo />
        </div>
      </header>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-lg w-full text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-[#E8A64A]/10 border border-[#E8A64A]/25">
            <Radar className="w-3.5 h-3.5 text-[#E8A64A] animate-pulse" />
            <span className="text-xs font-medium text-[#F0B96B] font-mono tracking-[0.15em] uppercase">
              Signal not yet online
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-[#E4E2ED] leading-[1.1] tracking-tight mb-4">
            This page is still
            <br />
            being scanned.
          </h1>

          <p className="text-[#94A3B8] leading-relaxed mb-10 max-w-sm mx-auto">
            We're building this part of ScoutVeil. Check back soon — or head
            back to somewhere that already exists.
          </p>

          {/* Card echoing the diff-card / step-panel treatment from Home */}
          <div className="rounded-2xl border border-white/10 bg-white/4 backdrop-blur-xl shadow-2xl overflow-hidden mb-10 text-left">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#E8C24A]" />
                <span className="font-mono text-xs text-[#94A3B8]">
                  status.scoutveil.app
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-wide">
                in progress
              </span>
            </div>
            <div className="p-5 font-mono text-[13px] leading-7 space-y-0.5">
              <div className="flex gap-3 text-[#94A3B8]">
                <span className="select-none opacity-50"> </span>
                <span>Route registered</span>
              </div>
              <div className="flex gap-3 text-[#4ADE9E]">
                <span className="select-none opacity-50">+</span>
                <span>Layout online</span>
              </div>
              <div className="flex gap-3 text-[#E8C24A]">
                <span className="select-none opacity-50">+</span>
                <span>Page content — pending</span>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="group inline-flex items-center gap-2 bg-[#E8A64A] hover:bg-[#F0B96B] transition-colors text-[#0B0D14] font-medium rounded-lg px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>
        </motion.div>
      </div>

      <footer className="relative z-10 py-8 px-6 border-t border-white/5">
        <p className="max-w-350 mx-auto text-xs text-[#94A3B8] font-mono">
          ScoutVeil — competitive intelligence, automated.
        </p>
      </footer>
    </main>
  );
}