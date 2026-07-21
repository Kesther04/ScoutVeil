import { useState, useRef, useEffect } from "react";
import type { ReactElement } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  Radar,
  ShieldAlert,
  Sparkles,
  Globe,
  Briefcase,
  Fingerprint,
  ChevronDown,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../shared/components/Logo";
// import hero from "../assets/hero.jpeg"
import heroImg from "../assets/hero_img.jpeg"

/* ------------------------------------------------------------------ */
/*  Design tokens (ScoutVeil brand — dark only, amber-orange accent)   */
/*  void        #0B0D14   background                                   */
/*  signal      #E8A64A   brand / accent (chrome only)                 */
/*  paper       #E4E2ED   primary text                                 */
/*  ghost       #94A3B8   secondary text / metadata                    */
/*  threat-high #E85A4A   High threat label (shifted red vs brand amber)*/
/*  threat-med  #E8C24A   Medium threat label                          */
/*  threat-low  #4ADE9E   Low threat label                             */
/*                                                                      */
/*  Brand amber (#E8A64A) sits close to threat-high on the wheel, so    */
/*  threat-high is shifted toward coral/red to stay visually distinct   */
/*  wherever both appear together (e.g. Roadmap status tags).           */
/* ------------------------------------------------------------------ */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-mono text-xs tracking-[0.2em] text-[#F0B96B] uppercase mb-4">
      {children}
    </p>
  );
}

/* ------------------------------ Nav ------------------------------- */

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0B0D14]/80 backdrop-blur-md">
      <div className="max-w-362.5 mx-auto px-6 h-18 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm  text-[#94A3B8]">
          <a href="#hero" className="hover:text-[#E4E2ED] transition-colors">
            Home
          </a>
          <a href="#features" className="hover:text-[#E4E2ED] transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-[#E4E2ED] transition-colors">
            How It Works
          </a>
          <a href="#roadmap" className="hover:text-[#E4E2ED] transition-colors">
            Roadmap
          </a>
          <a href="#faq" className="hover:text-[#E4E2ED] transition-colors">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/auth/login"
            className="hidden sm:flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-[#E4E2ED] transition-colors px-3 py-2"
          >
            <LogIn className="w-3.5 h-3.5" />
            Log in
          </Link>
          <Link
            to="/auth/register"
            className="text-sm font-medium text-[#0B0D14] bg-[#E8A64A] hover:bg-[#F0B96B] transition-colors rounded-lg px-4 py-2"
          >
            Start tracking
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------ Hero ------------------------------ */

function DiffLine({
  type,
  children,
}: {
  type: "removed" | "added" | "meta";
  children: string;
}) {
  const styles = {
    removed: "text-[#E85A4A]/70 line-through decoration-[#E85A4A]/40",
    added: "text-[#4ADE9E]",
    meta: "text-[#94A3B8]",
  };
  const prefix = { removed: "−", added: "+", meta: " " };
  return (
    <div className={`flex gap-3 ${styles[type]}`}>
      <span className="select-none opacity-50">{prefix[type]}</span>
      <span>{children}</span>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      style={{
          // backgroundImage: `url(${hero})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      className="relative pt-20 px-12  min-h-screen flex items-center overflow-hidden pb-12"
    >
      {/* Base dark overlay */}
      <div className={`absolute inset-0 bg-black/75  pointer-events-none`} />

      {/* Bottom vignette — kills the client data bleed specifically */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient from-black/80 via-black/30 to-transparent pointer-events-none " />

      {/* Left vignette — protects headline from background content */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient from-black/50 to-transparent pointer-events-none" /> 

     
      {/* Restrained glow accents — the only background treatment, no image */}
      <div className="absolute -top-24 -right-16 w-[500px] h-[500px] rounded-full bg-[#E8A64A]/30 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-[360px] h-[360px] rounded-full bg-[#E8A64A]/30 blur-[100px] pointer-events-none" />

      {/* Subtle grid lines — quiet texture, not a photo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-350 mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
        <motion.div initial="hidden" animate="show" variants={container}>
          <motion.div variants={fadeUp}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-[#E8A64A]/10 border border-[#E8A64A]/25">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8A64A] animate-pulse" />
              <span className="text-xs font-medium text-[#F0B96B]">
                Competitive intelligence, automated
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl font-light text-[#E4E2ED] leading-[1.05] tracking-tight mb-6"
          >
            Know what they changed
            <br />
            before your next call.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-[#94A3B8] leading-relaxed mb-10 max-w-md"
          >
            ScoutVeil watches your competitors' websites, hiring activity, and
            public infrastructure — then tells you what it means, every week,
            in plain language.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
            <Link
              to="/auth/register"
              className="group flex items-center gap-2 bg-[#E8A64A] hover:bg-[#F0B96B] transition-colors text-[#0B0D14] font-medium rounded-lg px-6 py-3"
            >
              Start tracking a competitor
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            
            <a
              href="#how-it-works"
              className="text-sm text-[#94A3B8] hover:text-[#E4E2ED] transition-colors"
            >
              See how it works
            </a>
          </motion.div>
        </motion.div>

        {/* Right side: diff-card, now composed with floating badge chips
            top-right and bottom-left — same layout language as the
            reference (badge callouts framing the visual), but the visual
            itself stays the real product artifact, not decoration. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          {/* Floating badge — top right, mirrors "Security Score 98/100" chip */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute -top-5 -right-5 z-20 rounded-xl border border-white/10 bg-[#12141D] shadow-xl px-4 py-3 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E8A64A]/15 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4 text-[#E8A64A]" strokeWidth={2} />
            </div>
            <div>
              <div className="text-[10px] text-[#94A3B8] uppercase tracking-wide">
                Threat score
              </div>
              <div className="text-sm font-semibold text-[#E4E2ED]">Medium</div>
            </div>
          </motion.div>

          {/* Main diff-card — the actual product artifact */}
          {/* <div className="rounded-2xl border border-white/10 bg-white/4 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#E85A4A]" />
                <span className="font-mono text-xs text-[#94A3B8]">
                  rivalco.com/pricing
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-wide">
                detected 4h ago
              </span>
            </div>
            <div className="p-5 font-mono text-[13px] leading-7 space-y-0.5">
              <DiffLine type="meta">Starter — $0/mo</DiffLine>
              <DiffLine type="removed">Team — $49/mo, up to 5 seats</DiffLine>
              <DiffLine type="added">Team — $89/mo, up to 5 seats</DiffLine>
              <DiffLine type="added">
                Enterprise — Custom pricing, SSO included
              </DiffLine>
            </div>
            <div className="px-5 py-4 border-t border-white/5 bg-[#E8A64A]/6">
              <p className="text-xs text-[#E4E2ED]">
                <span className="text-[#F0B96B] font-medium">Read:</span>{" "}
                Pricing restructure plus a new enterprise tier — signals an
                upmarket push.
              </p>
            </div>
          </div> */}

          <div className="relative rounded-lg border border-white/10 bg-white/4 backdrop-blur-xl shadow-2xl overflow-hidden">
            <img src={heroImg} alt="heroImg" className="w-full" />
          </div>

          {/* Floating badge — bottom left, mirrors "Scan Complete" chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -bottom-5 -left-5 z-20 rounded-xl border border-[#4ADE9E]/20 bg-[#12141D] shadow-xl px-4 py-3 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-[#4ADE9E]/15 flex items-center justify-center shrink-0">
              <Radar className="w-4 h-4 text-[#4ADE9E]" strokeWidth={2} />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#E4E2ED]">
                Scan complete
              </div>
              <div className="text-[10px] text-[#4ADE9E]">3 new signals found</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------- Features ----------------------------- */

const features = [
  {
    icon: Globe,
    title: "Website change detection",
    body: "Homepage and pricing pages tracked and diffed on a schedule, so you see exactly what changed and when.",
    variant: "fill",
  },
  {
    icon: Briefcase,
    title: "Job posting tracker",
    body: "New roles pulled from public job boards, categorized by department — a run of sales hires reveals a roadmap shift before it's announced.",
    variant: "outline",
  },
  {
    icon: Fingerprint,
    title: "Subdomain discovery",
    body: "Certificate transparency logs surface new subdomains — often the first public trace of something being built in staging.",
    variant: "outline",
  },
  {
    icon: Sparkles,
    title: "Weekly AI digest",
    body: "All of the week's signals, turned into a two-minute plain-language brief. No dashboards to interpret yourself.",
    variant: "fill",
  },
  {
    icon: ShieldAlert,
    title: "Threat scoring",
    body: "Every competitor gets a Low, Medium, or High label with the reasoning behind it — not just a number.",
    variant: "outline",
  },
  {
    icon: Radar,
    title: "Full change history",
    body: "A timestamped evidence log per competitor, so you can replay exactly how they've moved over time.",
    variant: "outline",
  },
] as const;

function FeatureCard({ f, index }: { f: (typeof features)[number]; index: number }) {
  const Icon = f.icon;
  const isFill = f.variant === "fill";

  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay: index * 0.06 }}
      className={`relative overflow-hidden rounded-2xl p-6 border transition-colors ${
        isFill
          ? "bg-linear-to-b from-[#E8A64A]/15 to-[#E8A64A]/3 border-[#E8A64A]/20"
          : "bg-white/2 border-white/10 hover:bg-white/4"
      }`}
    >
      <div
        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5 ${
          isFill ? "bg-[#E8A64A]/20" : "bg-white/5"
        }`}
      >
        <Icon
          className={`w-5 h-5 ${isFill ? "text-[#F0B96B]" : "text-[#E8A64A]"}`}
          strokeWidth={1.5}
        />
      </div>
      <h3 className="text-[#E4E2ED] font-medium mb-2">{f.title}</h3>
      <p className="text-sm text-[#94A3B8] leading-relaxed">{f.body}</p>
    </motion.div>
  );
}

function Features() {
  return (
    <section id="features" className="py-28 px-6 border-b border-white/5">
      <div className="max-w-350 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="max-w-xl mb-16"
        >
          <SectionLabel>What it does</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-light text-[#E4E2ED] tracking-tight">
            Three signals. One narrative.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------- How it works ---------------------------- */

const steps = [
  {
    n: "01",
    title: "Add a competitor by domain",
    body: "Type in a domain or company name. Tracking starts immediately — no setup, no configuration.",
    tag: "Live in seconds",
  },
  {
    n: "02",
    title: "Signals collected automatically",
    body: "Website changes, job postings, and subdomain activity are scanned on a schedule and diffed against history.",
    tag: "Runs in the background",
  },
  {
    n: "03",
    title: "AI digest lands in your inbox",
    body: "Once a week, a plain-language brief tells you what changed, what it likely means, and how urgent it is.",
    tag: "Two-minute read",
  },
];

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (pausedRef.current) return;
      setActiveStep((s) => (s + 1) % steps.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="how-it-works" className="py-28 px-6 border-b border-white/5">
      <div className="max-w-350 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="max-w-xl mb-16"
        >
          <SectionLabel>How it works</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-light text-[#E4E2ED] tracking-tight">
            From domain to digest.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="flex flex-col divide-y divide-white/5">
            {steps.map((step, i) => (
              <div
                key={step.n}
                onClick={() => {
                  pausedRef.current = true;
                  setActiveStep(i);
                }}
                onMouseLeave={() => {
                  pausedRef.current = false;
                }}
                className={`flex gap-5 py-6 cursor-pointer transition-opacity ${
                  activeStep === i ? "opacity-100" : "opacity-45 hover:opacity-75"
                }`}
              >
                <span
                  className={`font-mono text-2xl w-10 shrink-0 leading-none transition-colors ${
                    activeStep === i ? "text-[#E8A64A]" : "text-[#565A72]"
                  }`}
                >
                  {step.n}
                </span>
                <div>
                  <h3 className="text-[#E4E2ED] font-medium mb-1.5">{step.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{step.body}</p>
                  <span className="mt-2.5 inline-block rounded-full px-2.5 py-1 text-xs font-medium bg-[#E8A64A]/10 text-[#F0B96B]">
                    {step.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-6 sticky top-24">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E85A4A]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E8C24A]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#4ADE9E]" />
              </div>
              <span className="text-xs text-[#94A3B8]">
                Step {activeStep + 1} — {steps[activeStep].title}
              </span>
            </div>

            {activeStep === 0 && (
              <motion.div
                key="panel-0"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4"
              >
                <div className="border border-white/10 rounded-xl p-4 bg-black/20">
                  <div className="font-mono text-[11px] text-[#F0B96B] uppercase tracking-widest mb-2">
                    domain input
                  </div>
                  <div className="text-sm text-[#E4E2ED] font-mono">
                    rivalco.com
                    <span className="inline-block w-0.5 h-3.5 bg-[#E8A64A] ml-0.5 animate-pulse" />
                  </div>
                </div>
                <button className="self-start rounded-full bg-[#E8A64A] text-[#0B0D14] text-xs font-medium px-4 py-2">
                  Start tracking →
                </button>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  No setup, no configuration — tracking begins the moment you
                  add a domain.
                </p>
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div
                key="panel-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-2"
              >
                {[
                  { done: true, label: "Homepage scanned — 6:00 AM" },
                  { done: true, label: "Pricing page diffed — 6:02 AM" },
                  { done: true, label: "3 new job postings found — 6:04 AM" },
                  { done: false, label: "Subdomain scan — queued" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-2.5">
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        row.done ? "bg-[#4ADE9E]" : "bg-white/15"
                      }`}
                    />
                    <span
                      className={`text-xs ${row.done ? "text-[#E4E2ED] font-medium" : "text-[#94A3B8]"}`}
                    >
                      {row.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                key="panel-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-3"
              >
                <div className="rounded-xl border border-[#E8A64A]/20 bg-[#E8A64A]/6 p-4">
                  <div className="text-xs font-mono text-[#F0B96B] uppercase tracking-widest mb-2">
                    weekly digest
                  </div>
                  <p className="text-xs text-[#E4E2ED] leading-relaxed">
                    Rivalco restructured pricing and posted 3 enterprise sales
                    roles this week — signs of an upmarket push.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-xs font-medium bg-[#E8C24A]/10 text-[#E8C24A]">
                  Threat: Medium
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Roadmap ------------------------------ */

const roadmap = [
  {
    status: "now",
    label: "Layer 1",
    title: "Signal monitor foundation",
    body: "Website diffing, job posting tracker, and change history — the core loop that makes ScoutVeil worth opening weekly.",
  },
  {
    status: "next",
    label: "Layer 2",
    title: "OSINT + AI digest",
    body: "Subdomain discovery via certificate transparency, plus the weekly AI digest and threat scoring.",
  },
  {
    status: "later",
    label: "Later",
    title: "Review + social signals",
    body: "Review sentiment tracking, social signal monitoring, and funding/company signals — once the core loop is validated.",
  },
];

const statusColor: Record<string, string> = {
  now: "text-[#4ADE9E] bg-[#4ADE9E]/10",
  next: "text-[#E8C24A] bg-[#E8C24A]/10",
  later: "text-[#94A3B8] bg-white/5",
};

function Roadmap() {
  return (
    <section id="roadmap" className="py-28 px-6 border-b border-white/5">
      <div className="max-w-350 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="max-w-xl mb-16"
        >
          <SectionLabel>Roadmap</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-light text-[#E4E2ED] tracking-tight">
            Built in the open, shipped in order.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="grid sm:grid-cols-3 gap-5"
        >
          {roadmap.map((r) => (
            <motion.div
              key={r.title}
              variants={fadeUp}
              className="rounded-2xl border border-white/10 bg-white/2 p-6"
            >
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium mb-4 ${statusColor[r.status]}`}
              >
                {r.label}
              </span>
              <h3 className="text-[#E4E2ED] font-medium mb-2">{r.title}</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{r.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------- FAQ --------------------------------- */

const faqs = [
  {
    q: "How is this different from Crayon or Klue?",
    a: "Crayon and Klue start at $300–2,000/month and are built for enterprise sales teams. ScoutVeil is built for early-stage founders, combines OSINT-grade signals they don't offer, and starts well under $100/month.",
  },
  {
    q: "Where does the data actually come from?",
    a: "Fully public sources — competitor websites, public job boards, and certificate transparency logs. No active scanning, no private data, no legal gray area.",
  },
  {
    q: "How often are competitors checked?",
    a: "Website and job signals are scanned on a daily schedule. The AI digest that ties everything together is delivered weekly.",
  },
  {
    q: "Can I track more than one competitor?",
    a: "Yes. Add as many domains as you want to monitor — each gets its own change history and threat score.",
  },
  {
    q: "Do I need to know anything technical to use this?",
    a: "No. Add a competitor by domain and everything else — scanning, diffing, and the weekly brief — happens automatically.",
  },
];

function FAQItem({
  q,
  a,
  isOpen,
  onClick,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-white/5">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-[#E4E2ED] font-medium pr-8 group-hover:text-white transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#94A3B8] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#94A3B8] leading-relaxed pb-6 pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 px-6 border-b border-white/5">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-16"
        >
          <SectionLabel>Questions</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-light text-[#E4E2ED] tracking-tight">
            Common questions.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          {faqs.map((f, i) => (
            <FAQItem
              key={f.q}
              q={f.q}
              a={f.a}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mt-12 rounded-2xl border border-[#E8A64A]/20 bg-[#E8A64A]/5 p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-[#E4E2ED] font-medium mb-1">Ready to see what they're up to?</h3>
            <p className="text-sm text-[#94A3B8]">No credit card required to start.</p>
          </div>
          <Link
            to="/auth/register"
            className="flex items-center gap-2 bg-[#E8A64A] hover:bg-[#F0B96B] transition-colors text-[#0B0D14] font-medium rounded-lg px-6 py-3 whitespace-nowrap"
          >
            Start tracking a competitor
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------- Footer -------------------------------- */

function Footer() {
  return (
    <footer className="py-16 px-6">
      <div className="max-w-350 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Logo />
          </div>
          <p className="text-sm text-[#94A3B8] max-w-xs leading-relaxed">
            Competitive intelligence for early-stage B2B founders. Public
            sources only.
          </p>
        </div>

        <div className="flex gap-12">
          <div>
            <p className="font-mono text-xs text-[#94A3B8] uppercase tracking-wide mb-3">
              Product
            </p>
            <div className="flex flex-col gap-2 text-sm text-[#94A3B8]">
              <a href="#features" className="hover:text-[#E4E2ED] transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-[#E4E2ED] transition-colors">
                How it works
              </a>
              <a href="#roadmap" className="hover:text-[#E4E2ED] transition-colors">
                Roadmap
              </a>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs text-[#94A3B8] uppercase tracking-wide mb-3">
              Account
            </p>
            <div className="flex flex-col gap-2 text-sm text-[#94A3B8]">
              <Link to="/auth/login" className="hover:text-[#E4E2ED] transition-colors">
                Log in
              </Link>
              <Link to="/auth/register" className="hover:text-[#E4E2ED] transition-colors">
                Sign up
              </Link>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs text-[#94A3B8] uppercase tracking-wide mb-3">
              Built by
            </p>
            <div className="flex flex-col gap-2 text-sm text-[#94A3B8]">
              <a
                href="https://kesther.vercel.app"
                className="hover:text-[#E4E2ED] transition-colors"
              >
                Kesther Ogbu
              </a>
              <a
                href="https://github.com/kesther04"
                className="hover:text-[#E4E2ED] transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-350 mx-auto mt-12 pt-8 border-t border-white/5">
        <p className="text-xs text-[#94A3B8] font-mono">
          ScoutVeil — data collected from public sources only. Passive recon,
          no active scanning.
        </p>
      </div>
    </footer>
  );
}

/* -------------------------------- Page --------------------------------- */

export default function ScoutVeilLandingPage(): ReactElement {
  return (
    <main className="bg-[#0B0D14] min-h-screen antialiased selection:bg-[#E8A64A]/30">
      <Nav />
      <Hero />
      <Features />
      <HowItWorks />
      <Roadmap />
      <FAQ />
      <Footer />
    </main>
  );
}