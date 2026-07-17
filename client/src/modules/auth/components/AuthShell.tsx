import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Radar, ShieldAlert } from "lucide-react";
import Logo from "../../../shared/components/Logo";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

/** Rotating snapshot of a signal, mirrors the landing page's diff-card so
 *  the auth flow still feels like the product rather than a generic form. */
function BrandPanel() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#0B0D14] px-14 py-12">
      <div className="absolute -top-24 -left-16 w-[420px] h-[420px] rounded-full bg-[#E8A64A]/8 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-16 -right-12 w-[340px] h-[340px] rounded-full bg-[#E8A64A]/5 blur-[100px] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10">
        <Logo />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-sm"
      >
        <h2 className="text-3xl font-light text-[#E4E2ED] leading-[1.15] tracking-tight mb-4">
          Know what they changed before your next call.
        </h2>
        <p className="text-sm text-[#94A3B8] leading-relaxed mb-8">
          ScoutVeil watches your competitors' websites, hiring activity, and
          public infrastructure — then tells you what it means, every week.
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <span className="font-mono text-[11px] text-[#94A3B8]">rivalco.com</span>
            <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium bg-[#E8C24A]/10 text-[#E8C24A]">
              Medium
            </span>
          </div>
          <div className="px-4 py-4 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#E8A64A]/15 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-3.5 h-3.5 text-[#E8A64A]" strokeWidth={2} />
            </div>
            <p className="text-xs text-[#E4E2ED] leading-relaxed">
              Pricing restructure plus a new enterprise tier — signals an
              upmarket push.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2.5 text-xs text-[#4ADE9E]">
          <Radar className="w-3.5 h-3.5" />
          3 new signals this week
        </div>
      </motion.div>

      <p className="relative z-10 text-xs text-[#565A72] font-mono">
        Public sources only. Passive recon, no active scanning.
      </p>
    </div>
  );
}

export default function AuthShell({ eyebrow, title, subtitle, children, footer }: AuthShellProps) {
  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-[#0B0D14] antialiased selection:bg-[#E8A64A]/30">
      <BrandPanel />

      <div className="flex flex-col justify-center px-6 sm:px-12 py-16 relative">
        <div className="lg:hidden mb-10">
          <Logo />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-sm mx-auto lg:mx-0"
        >
          <p className="font-mono text-xs tracking-[0.2em] text-[#F0B96B] uppercase mb-3">
            {eyebrow}
          </p>
          <h1 className="text-2xl font-light text-[#E4E2ED] tracking-tight mb-2">{title}</h1>
          {subtitle ? <p className="text-sm text-[#94A3B8] mb-8">{subtitle}</p> : <div className="mb-6" />}

          {children}

          {footer ? <div className="mt-8 text-sm text-[#94A3B8]">{footer}</div> : null}
        </motion.div>

        <Link
          to="/"
          className="hidden lg:block absolute bottom-10 left-12 text-xs text-[#565A72] hover:text-[#94A3B8] transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}