import { useState } from "react";
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
} from "lucide-react";
import Logo from "../shared/components/Logo";

/* ------------------------------------------------------------------ */
/*  Design tokens (ScoutVeil brand — dark only, purple accent)         */
/*  void        #0B0D14   background                                   */
/*  signal      #7C6AEF   brand / accent (chrome only)                 */
/*  paper       #E4E2ED   primary text                                 */
/*  ghost       #565A72   secondary text / metadata                    */
/*  threat-high #E8734A   High threat label only                       */
/*  threat-med  #E8B34A   Medium threat label only                     */
/*  threat-low  #4ADE9E   Low threat label only                        */
/* ------------------------------------------------------------------ */

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-mono text-xs tracking-[0.2em] text-[#7C6AEF] uppercase mb-4">
      {children}
    </p>
  );
}

/* ------------------------------ Nav ------------------------------- */

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0B0D14]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#565A72]">
          <a href="#features" className="hover:text-[#E4E2ED] transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-[#E4E2ED] transition-colors">
            How it works
          </a>
          <a href="#roadmap" className="hover:text-[#E4E2ED] transition-colors">
            Roadmap
          </a>
          <a href="#faq" className="hover:text-[#E4E2ED] transition-colors">
            FAQ
          </a>
        </nav>
        <button className="text-sm font-medium text-[#0B0D14] bg-[#E4E2ED] hover:bg-white transition-colors rounded-lg px-4 py-2">
          Join waitlist
        </button>
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
    removed: "text-[#E8734A]/70 line-through decoration-[#E8734A]/40",
    added: "text-[#4ADE9E]",
    meta: "text-[#565A72]",
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
    <section className="relative pt-40 pb-28 px-6 border-b border-white/5">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Competitive intelligence, automated</SectionLabel>
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
            className="text-lg text-[#565A72] leading-relaxed mb-10 max-w-md"
          >
            ScoutVeil watches your competitors' websites, hiring activity, and
            public infrastructure — then tells you what it means, every week,
            in plain language.
          </motion.p>
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <button className="group flex items-center gap-2 bg-[#7C6AEF] hover:bg-[#6A58DC] transition-colors text-white font-medium rounded-lg px-6 py-3">
              Join the waitlist
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#how-it-works"
              className="text-sm text-[#565A72] hover:text-[#E4E2ED] transition-colors"
            >
              See how it works
            </a>
          </motion.div>
        </motion.div>

        {/* Signature element: a live-looking evidence diff, the product's core artifact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl border border-white/10 bg-white/1.5 overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#E8734A]" />
              <span className="font-mono text-xs text-[#565A72]">
                rivalco.com/pricing
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#565A72] uppercase tracking-wide">
              detected 4h ago
            </span>
          </div>
          <div className="p-5 font-mono text-[13px] leading-7 space-y-0.5">
            <DiffLine type="meta">Starter — $0/mo</DiffLine>
            <DiffLine type="removed">Team — $49/mo, up to 5 seats</DiffLine>
            <DiffLine type="added">Team — $89/mo, up to 5 seats</DiffLine>
            <DiffLine type="added">Enterprise — Custom pricing, SSO included</DiffLine>
          </div>
          <div className="px-5 py-4 border-t border-white/5 bg-white/1.5">
            <p className="text-xs text-[#E4E2ED]">
              <span className="text-[#7C6AEF] font-medium">Read:</span>{" "}
              Pricing restructure plus a new enterprise tier — signals an
              upmarket push.
            </p>
          </div>
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
  },
  {
    icon: Briefcase,
    title: "Job posting tracker",
    body: "New roles pulled from public job boards, categorized by department — a run of sales hires reveals a roadmap shift before it's announced.",
  },
  {
    icon: Fingerprint,
    title: "Subdomain discovery",
    body: "Certificate transparency logs surface new subdomains — often the first public trace of something being built in staging.",
  },
  {
    icon: Sparkles,
    title: "Weekly AI digest",
    body: "All of the week's signals, turned into a two-minute plain-language brief. No dashboards to interpret yourself.",
  },
  {
    icon: ShieldAlert,
    title: "Threat scoring",
    body: "Every competitor gets a Low, Medium, or High label with the reasoning behind it — not just a number.",
  },
  {
    icon: Radar,
    title: "Full change history",
    body: "A timestamped evidence log per competitor, so you can replay exactly how they've moved over time.",
  },
];

function Features() {
  return (
    <section id="features" className="py-28 px-6 border-b border-white/5">
      <div className="max-w-6xl mx-auto">
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="bg-[#0B0D14] p-8 hover:bg-white/10 transition-colors"
            >
              <f.icon className="w-5 h-5 text-[#7C6AEF] mb-5" strokeWidth={1.5} />
              <h3 className="text-[#E4E2ED] font-medium mb-2">{f.title}</h3>
              <p className="text-sm text-[#565A72] leading-relaxed">{f.body}</p>
            </motion.div>
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
  },
  {
    n: "02",
    title: "Signals collected automatically",
    body: "Website changes, job postings, and subdomain activity are scanned on a schedule and diffed against history.",
  },
  {
    n: "03",
    title: "AI digest lands in your inbox",
    body: "Once a week, a plain-language brief tells you what changed, what it likely means, and how urgent it is.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 border-b border-white/5">
      <div className="max-w-6xl mx-auto">
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

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((s) => (
            <motion.div key={s.n} variants={fadeUp} className="relative">
              <span className="font-mono text-sm text-[#7C6AEF]/60 block mb-4">
                {s.n}
              </span>
              <h3 className="text-[#E4E2ED] font-medium mb-2">{s.title}</h3>
              <p className="text-sm text-[#565A72] leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </motion.div>
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
  next: "text-[#E8B34A] bg-[#E8B34A]/10",
  later: "text-[#565A72] bg-[#565A72]/10",
};

function Roadmap() {
  return (
    <section id="roadmap" className="py-28 px-6 border-b border-white/5">
      <div className="max-w-6xl mx-auto">
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
          className="space-y-px bg-white/5 rounded-2xl overflow-hidden"
        >
          {roadmap.map((r) => (
            <motion.div
              key={r.title}
              variants={fadeUp}
              className="bg-[#0B0D14] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
            >
              <span
                className={`font-mono text-xs uppercase tracking-wide px-3 py-1 rounded-full w-fit ${statusColor[r.status]}`}
              >
                {r.label}
              </span>
              <div>
                <h3 className="text-[#E4E2ED] font-medium mb-1">{r.title}</h3>
                <p className="text-sm text-[#565A72] leading-relaxed">{r.body}</p>
              </div>
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
          className={`w-4 h-4 text-[#565A72] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
            <p className="text-sm text-[#565A72] leading-relaxed pb-6 pr-8">{a}</p>
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
      </div>
    </section>
  );
}

/* ------------------------------- Footer -------------------------------- */

function Footer() {
  return (
    <footer className="py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Radar className="w-5 h-5 text-[#7C6AEF]" strokeWidth={1.75} />
            <span className="font-medium text-[#E4E2ED] tracking-tight">
              ScoutVeil
            </span>
          </div>
          <p className="text-sm text-[#565A72] max-w-xs leading-relaxed">
            Competitive intelligence for early-stage B2B founders. Public
            sources only.
          </p>
        </div>

        <div className="flex gap-12">
          <div>
            <p className="font-mono text-xs text-[#565A72] uppercase tracking-wide mb-3">
              Product
            </p>
            <div className="flex flex-col gap-2 text-sm text-[#565A72]">
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
            <p className="font-mono text-xs text-[#565A72] uppercase tracking-wide mb-3">
              Built by
            </p>
            <div className="flex flex-col gap-2 text-sm text-[#565A72]">
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

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5">
        <p className="text-xs text-[#565A72] font-mono">
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
    <main className="bg-[#0B0D14] min-h-screen antialiased selection:bg-[#7C6AEF]/30">
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