"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Zap, Globe, Bell, LayoutDashboard, Clock,
  Check, X, ChevronRight, Code2, MousePointerClick, Settings2,
  Wrench, Calendar, Star, Plus, Minus,
} from "lucide-react";
import { BookingWidget } from "@/components/widget/BookingWidget";
import { industryConfigs } from "@/lib/configs";

/* ─── Section wrapper (no hidden reveal — always visible) ──── */
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

/* ─── Data ───────────────────────────────────────────────────── */
const INDUSTRIES_LIVE = [
  { emoji: "\uD83D\uDEB0", label: "Plumbing", desc: "Drains, taps, hot water, gas fitting" },
  { emoji: "\uD83D\uDC1C", label: "Pest Control", desc: "Termites, rodents, spiders, ants" },
  { emoji: "\u2744\uFE0F", label: "HVAC", desc: "Air con, heating, ventilation, ducting" },
  { emoji: "\uD83D\uDD10", label: "Locksmith", desc: "Residential, commercial, automotive" },
  { emoji: "\u2728", label: "Cleaning", desc: "Home, commercial, end-of-lease" },
  { emoji: "\uD83C\uDF3F", label: "Landscaping", desc: "Lawn, gardens, tree services" },
];

const INDUSTRIES_COMING = [
  { emoji: "\u26A1", label: "Electrical", desc: "Wiring, switches, lighting" },
  { emoji: "\uD83C\uDFE0", label: "Roofing", desc: "Repairs, gutters, replacements" },
  { emoji: "\uD83C\uDFA8", label: "Painting", desc: "Interior, exterior, commercial" },
  { emoji: "\uD83D\uDD27", label: "Handyman", desc: "Odd jobs, repairs, assembly" },
  { emoji: "\uD83D\uDEBF", label: "Pool Service", desc: "Cleaning, pumps, chemicals" },
  { emoji: "\u2600\uFE0F", label: "Solar", desc: "Panels, batteries, inverters" },
  { emoji: "\uD83D\uDEA7", label: "Fencing", desc: "Wood, metal, Colorbond" },
  { emoji: "\uD83D\uDE97", label: "Auto Mechanic", desc: "Services, repairs, tyres" },
  { emoji: "\uD83D\uDC87", label: "Beauty & Salon", desc: "Hair, nails, lashes, spa" },
  { emoji: "\uD83E\uDDB7", label: "Dental", desc: "Check-ups, cleaning, cosmetic" },
  { emoji: "\uD83C\uDFE2", label: "Real Estate", desc: "Open homes, inspections" },
  { emoji: "\uD83D\uDE9A", label: "Removalists", desc: "House moves, office moves" },
  { emoji: "\uD83D\uDCE6", label: "Garage Doors", desc: "Install, repair, motors" },
  { emoji: "\uD83D\uDD12", label: "Security", desc: "Alarms, CCTV, access control" },
  { emoji: "\uD83D\uDE8C", label: "Towing", desc: "Roadside assist, transport" },
  { emoji: "\uD83C\uDFC0", label: "Sports & Venues", desc: "Court hire, field booking" },
];

const STEPS = [
  { icon: Settings2, title: "Pick your industry", desc: "Choose from our pre-built service menus tailored to your trade.", color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.15)" },
  { icon: MousePointerClick, title: "Customize services", desc: "Check off the services you offer. Remove what you don't.", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" },
  { icon: Code2, title: "Drop the script", desc: "One line of code. Works on any website. Live in 5 minutes.", color: "#10b981", bg: "rgba(16, 185, 129, 0.15)" },
];

const FEATURES = [
  { icon: Zap, title: "No full platform needed", desc: "Just a booking widget. Not a $200/mo business management system you'll never use.", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" },
  { icon: Globe, title: "Works everywhere", desc: "WordPress, Squarespace, Wix, Shopify, plain HTML. One script tag.", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.15)" },
  { icon: Wrench, title: "Industry-specific menus", desc: "Not a generic calendar. Real service options like 'Blocked Drain' and 'Leaking Tap'.", color: "#10b981", bg: "rgba(16, 185, 129, 0.15)" },
  { icon: Bell, title: "Instant notifications", desc: "Email and SMS alerts the moment a customer books. Never miss a lead.", color: "#f43f5e", bg: "rgba(244, 63, 94, 0.15)" },
  { icon: LayoutDashboard, title: "Dashboard inbox", desc: "See all bookings in one place. Confirm, complete, or cancel with one click.", color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.15)" },
  { icon: Clock, title: "5-minute setup", desc: "Pick industry, enter business details, paste one script tag. Done.", color: "#06b6d4", bg: "rgba(6, 182, 212, 0.15)" },
];

const PRICING = [
  {
    name: "Starter",
    price: "39",
    desc: "Perfect for solo operators",
    features: ["1 booking widget", "Email notifications", "Dashboard inbox", "All industries", "Embed on any site", "Standard support"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "79",
    desc: "For growing businesses",
    features: ["3 booking widgets", "SMS + email notifications", "Dashboard inbox", "All industries", "Embed on any site", "Priority support", "Booking analytics"],
    highlighted: true,
  },
  {
    name: "Business",
    price: "149",
    desc: "For agencies & multi-location",
    features: ["Unlimited widgets", "SMS + email notifications", "Dashboard inbox", "All industries", "Custom branding", "API access", "Dedicated support", "White-label option"],
    highlighted: false,
  },
];

const COMPARISON = [
  { name: "BookButton", price: "$39/mo", widget: true, standalone: true, industrySpecific: true, fiveMin: true },
  { name: "ServiceTitan", price: "$245+/mo", widget: true, standalone: false, industrySpecific: true, fiveMin: false },
  { name: "Housecall Pro", price: "$59+/mo", widget: true, standalone: false, industrySpecific: false, fiveMin: false },
  { name: "Jobber", price: "$25+/mo", widget: false, standalone: false, industrySpecific: false, fiveMin: false },
];

const FAQS = [
  { q: "Do I need a developer to set this up?", a: "No. You pick your industry, enter your business details, and get a single line of code to paste on your website. If you can copy and paste, you can set up BookButton. Most customers are live in under 5 minutes." },
  { q: "What websites does it work on?", a: "Any website. WordPress, Squarespace, Wix, Shopify, Webflow, plain HTML — if it has a website, BookButton works on it. It's just one script tag." },
  { q: "How do I get notified when someone books?", a: "You get an instant email notification with all the booking details — customer name, phone, service needed, preferred time. On the Pro plan and above, you also get SMS notifications." },
  { q: "Is this a full business management platform?", a: "No — and that's the point. BookButton is just a booking widget. You don't need to learn a whole new platform, migrate your data, or pay $200+/month for features you'll never use. Just bookings." },
  { q: "Can I customize which services appear in the widget?", a: "Yes. During setup, you choose from our pre-built service menu for your industry and uncheck anything you don't offer. You can also add custom services." },
  { q: "What happens when a customer submits a booking?", a: "You get notified immediately via email (and SMS on Pro+). The booking appears in your dashboard inbox where you can confirm, reschedule, or cancel it. Then you call the customer to confirm." },
  { q: "Can I use BookButton for multiple locations?", a: "Yes. The Starter plan includes 1 widget, Pro includes 3, and Business gives you unlimited widgets — each with its own business name, phone number, and branding." },
  { q: "Is there a contract or setup fee?", a: "No contracts, no setup fees. Pay monthly, cancel anytime. You can also start with a free trial to test it out before committing." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-semibold text-[#0f172a] pr-4 group-hover:text-[#0891b2] transition-colors">{q}</span>
        {open
          ? <Minus className="h-5 w-5 text-[#0891b2] flex-shrink-0" />
          : <Plus className="h-5 w-5 text-gray-400 flex-shrink-0 group-hover:text-[#0891b2] transition-colors" />
        }
      </button>
      {open && (
        <div className="pb-5 pr-8">
          <p className="text-gray-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function LandingPage() {
  const plumbingConfig = industryConfigs["plumbing"];

  return (
    <div className="overflow-hidden">

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0f172a]/80 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="BookButton" width={72} height={72} />
            <span className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Book<span className="text-[#22d3ee]">Button</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-gray-200 hover:text-[#22d3ee] font-medium transition-colors">How it works</a>
            <a href="#industries" className="text-sm text-gray-200 hover:text-[#22d3ee] font-medium transition-colors">Industries</a>
            <a href="#pricing" className="text-sm text-gray-200 hover:text-[#22d3ee] font-medium transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-gray-200 hover:text-[#22d3ee] font-medium transition-colors">FAQ</a>
            <Link href="/preview" target="_blank" className="text-sm text-gray-200 hover:text-[#22d3ee] font-medium transition-colors">Live Demo</Link>
            <Link
              href="/dashboard/onboarding"
              target="_blank"
              className="px-4 py-2 rounded-lg bg-[#0891b2] text-white text-sm font-semibold hover:bg-[#0e7490] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center bg-[#0f172a] hero-grid noise-overlay hero-grid-animated overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#0891b2]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#22d3ee]/10 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22d3ee]/20 bg-[#22d3ee]/5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
              <span className="text-xs font-medium text-[#22d3ee] tracking-wide uppercase">Works for any industry</span>
            </div>

            <h1 className="animate-fade-up-d1 text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
              One button.<br />
              <span className="text-gradient">Instant bookings.</span>
            </h1>

            <p className="animate-fade-up-d2 mt-6 text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
              Drop a booking widget onto any website in 5 minutes. Industry-specific service menus that convert visitors into jobs.
            </p>

            <div className="animate-fade-up-d3 mt-10 flex flex-wrap gap-4">
              <Link
                href="/preview"
                target="_blank"
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#0891b2] to-[#06b6d4] text-white font-semibold text-sm shadow-lg shadow-[#0891b2]/25 hover:shadow-xl hover:shadow-[#0891b2]/30 transition-all hover:scale-[1.02]"
              >
                Try Live Demo
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/dashboard/onboarding"
                target="_blank"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-white font-semibold text-sm hover:bg-white/5 transition-all"
              >
                Get Started Free
              </Link>
            </div>

            <div className="animate-fade-up-d4 mt-10 flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#22d3ee]" /> No credit card</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#22d3ee]" /> 5-min setup</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#22d3ee]" /> Cancel anytime</span>
            </div>
          </div>

          {/* Right — Widget mockup */}
          <div className="animate-fade-up-d3 relative hidden lg:block">
            <div className="animate-float">
              {/* Browser frame */}
              <div className="rounded-2xl border border-white/10 bg-[#1e293b]/80 backdrop-blur overflow-hidden shadow-2xl shadow-black/40">
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                  </div>
                  <div className="flex-1 mx-4 h-6 rounded bg-white/5 flex items-center justify-center">
                    <span className="text-[10px] text-gray-500 font-mono">smithsplumbing.com.au</span>
                  </div>
                </div>
                {/* Realistic fake plumber website */}
                <div className="bg-[#1a2332]">
                  {/* Nav */}
                  <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-[#0891b2]/60" />
                      <span className="text-[10px] font-bold text-white/80">Smith&apos;s Plumbing</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-[8px] text-white/40">Services</span>
                      <span className="text-[8px] text-white/40">About</span>
                      <span className="text-[8px] text-white/40">Contact</span>
                    </div>
                  </div>
                  {/* Hero banner */}
                  <div className="px-5 py-6 bg-gradient-to-r from-[#0c4a6e]/60 to-[#164e63]/60">
                    <p className="text-[13px] font-bold text-white leading-tight">24/7 Emergency<br/>Plumbing Service</p>
                    <p className="text-[8px] text-white/50 mt-1.5">Licensed plumbers across Sydney</p>
                    <div className="mt-3 w-16 h-5 rounded bg-[#0891b2]/70 flex items-center justify-center">
                      <span className="text-[7px] text-white font-semibold">Call Now</span>
                    </div>
                  </div>
                  {/* Service cards */}
                  <div className="px-5 py-4">
                    <p className="text-[9px] font-bold text-white/60 mb-2">Our Services</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white/5 rounded-lg p-2.5 text-center">
                        <span className="text-sm">🚰</span>
                        <p className="text-[7px] text-white/50 mt-1">Blocked Drains</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2.5 text-center">
                        <span className="text-sm">🔥</span>
                        <p className="text-[7px] text-white/50 mt-1">Hot Water</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2.5 text-center">
                        <span className="text-sm">🔧</span>
                        <p className="text-[7px] text-white/50 mt-1">Gas Fitting</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating BookButton overlay */}
              <div className="absolute bottom-4 left-4 animate-pulse-teal">
                <div className="flex items-center gap-2 pl-5 pr-3 py-2 rounded-full shadow-xl text-white text-sm font-semibold"
                  style={{ background: "#0891b2" }}>
                  Book Online
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Arrow annotation */}
              <div className="absolute -bottom-6 left-40 flex items-center gap-2 text-[#22d3ee]">
                <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                  <path d="M38 2C28 2 20 12 8 16L2 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M2 16L2 22L8 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs font-medium whitespace-nowrap">Your booking widget</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0891b2]">How it works</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a]">
                Live in three steps
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                No developers needed. No complex setup. Just a booking widget that works.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.title}>
                <div className="relative group">
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-8 border-t-2 border-dashed border-gray-200 z-10" style={{ transform: "translateX(-16px)" }} />
                  )}
                  <div className="card-hover bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: s.bg, boxShadow: `0 4px 12px ${s.color}20` }}>
                        <s.icon className="h-5 w-5" style={{ color: s.color }} />
                      </div>
                      <span className="text-6xl font-extrabold transition-colors" style={{ color: `${s.color}25`, WebkitTextStroke: `1.5px ${s.color}40` }}>
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0f172a] mb-2">{s.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Code snippet */}
          <Reveal className="mt-12">
            <div className="code-block rounded-2xl p-6 max-w-2xl mx-auto border border-white/5 overflow-x-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-4 font-mono">Embed code</p>
              <pre className="text-sm leading-relaxed font-mono">
                <span className="text-gray-500">&lt;</span><span className="text-[#22d3ee]">script</span>{"\n"}
                <span className="text-gray-400">  src</span><span className="text-gray-500">=</span><span className="text-green-400">&quot;https://bookbutton.io/widget.js&quot;</span>{"\n"}
                <span className="text-gray-400">  data-config</span><span className="text-gray-500">=</span><span className="text-green-400">&quot;plumbing&quot;</span>{"\n"}
                <span className="text-gray-400">  data-business</span><span className="text-gray-500">=</span><span className="text-green-400">&quot;Smith&apos;s Plumbing&quot;</span>{"\n"}
                <span className="text-gray-400">  data-phone</span><span className="text-gray-500">=</span><span className="text-green-400">&quot;0412 345 678&quot;</span>{"\n"}
                <span className="text-gray-400">  data-color</span><span className="text-gray-500">=</span><span className="text-green-400">&quot;#0891b2&quot;</span>{"\n"}
                <span className="text-gray-500">&gt;&lt;/</span><span className="text-[#22d3ee]">script</span><span className="text-gray-500">&gt;</span>
              </pre>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ LIVE DEMO ═══ */}
      <section className="py-24 bg-gray-50 relative">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0891b2]">Live demo</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a]">
                Try it right now
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Click the <strong>&quot;Book Online&quot;</strong> button in the bottom-left corner.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-[#0891b2]/5 flex items-center justify-center mx-auto mb-6">
                  <MousePointerClick className="h-10 w-10 text-[#0891b2]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-2">Your website goes here</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  The booking widget floats on top of any website content. Look for the teal &quot;Book Online&quot; button below.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Actual widget */}
        {/* Widget demo removed from landing page — visitors use /preview instead */}
        {false && plumbingConfig && (
          <BookingWidget
            industry={plumbingConfig}
            widget={{
              configId: "demo-plumbing",
              businessName: "Smith's Plumbing",
              phone: "0412 345 678",
              accentColor: "#0891b2",
            }}
            buttonText="Book Online Demo"
          />
        )}
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section id="industries" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0891b2]">Industries</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a]">
                Every trade. Every service.
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Industry-specific service menus — not a generic time picker. Real options like &quot;Blocked Drain&quot; and &quot;Termite Inspection&quot;.
              </p>
            </div>
          </Reveal>

          {/* Live industries */}
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#0f172a] mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Live now
            </p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
            {INDUSTRIES_LIVE.map((ind) => (
              <Reveal key={ind.label}>
                <div className="card-hover group bg-white rounded-xl border-2 border-gray-200 p-4 text-center hover:border-[#0891b2] hover:shadow-md transition-all">
                  <div className="text-3xl mb-2">{ind.emoji}</div>
                  <h3 className="font-bold text-sm text-[#0f172a]">{ind.label}</h3>
                  <p className="text-xs text-gray-600 mt-0.5">{ind.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Coming soon industries */}
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#0f172a] mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Coming soon
            </p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {INDUSTRIES_COMING.map((ind) => (
              <Reveal key={ind.label}>
                <div className="group bg-gray-100 rounded-lg border border-gray-200 p-3 text-center hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all">
                  <div className="text-xl mb-1">{ind.emoji}</div>
                  <h3 className="font-semibold text-xs text-[#0f172a]">{ind.label}</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{ind.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="text-center mt-8">
              <p className="text-sm text-gray-600">
                Don&apos;t see your industry? <a href="mailto:hello@bookbutton.io" className="text-[#0891b2] font-semibold hover:underline">Let us know</a> — we add new ones weekly.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ WHY BOOKBUTTON ═══ */}
      <section className="py-24 bg-[#0f172a] relative noise-overlay">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#22d3ee]">Why BookButton</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Everything you need.<br />Nothing you don&apos;t.
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <Reveal key={f.title}>
                <div
                  className="border-chase card-hover bg-white/5 backdrop-blur rounded-2xl border border-white/5 p-6 transition-colors"
                  style={{ "--chase-color": f.color } as React.CSSProperties}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: f.bg }}>
                    <f.icon className="h-5 w-5" style={{ color: f.color }} />
                  </div>
                  <h3 className="font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-24 bg-gray-50" style={{ color: "#0f172a" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0891b2]">Pricing</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a]">
                Simple, honest pricing
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                No contracts. No setup fees. Cancel anytime.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PRICING.map((plan) => (
              <Reveal key={plan.name}>
                <div className={`card-hover rounded-2xl p-8 flex flex-col ${
                  plan.highlighted
                    ? "bg-white border-2 border-[#0891b2] pricing-glow relative"
                    : "bg-white border border-gray-200"
                }`}>
                  {plan.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#0891b2] to-[#22d3ee] text-white text-xs font-bold uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-[#0f172a]">{plan.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{plan.desc}</p>
                  </div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-5xl font-extrabold text-[#0f172a]">${plan.price}</span>
                    <span className="text-gray-400 text-sm">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-[#0891b2] mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/dashboard/onboarding"
                    target="_blank"
                    className={`w-full py-3 rounded-xl text-center text-sm font-semibold transition-all ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-[#0891b2] to-[#06b6d4] text-white shadow-lg shadow-[#0891b2]/20 hover:shadow-xl hover:scale-[1.02]"
                        : "bg-gray-100 text-[#0f172a] hover:bg-gray-200"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0891b2]">Compare</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-[#0f172a]">
                BookButton vs full platforms
              </h2>
              <p className="mt-4 text-gray-500">
                They make you buy the whole toolkit. We just give you the button.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="overflow-x-auto">
              <table className="w-full text-[#0f172a]">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 pr-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Platform</th>
                    <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Booking Widget</th>
                    <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Standalone</th>
                    <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Industry Menus</th>
                    <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">5-Min Setup</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.name} className={`border-b border-gray-100 ${i === 0 ? "bg-[#0891b2]/5" : ""}`}>
                      <td className="py-4 pr-4">
                        <span className={`font-bold text-sm ${i === 0 ? "text-[#0891b2]" : "text-[#0f172a]"}`}>{row.name}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-sm font-bold ${i === 0 ? "text-[#0891b2]" : "text-[#0f172a]"}`}>{row.price}</span>
                      </td>
                      {[row.widget, row.standalone, row.industrySpecific, row.fiveMin].map((val, j) => (
                        <td key={j} className="py-4 px-4 text-center">
                          {val
                            ? <Check className={`h-5 w-5 mx-auto ${i === 0 ? "text-[#0891b2]" : "text-green-500"}`} />
                            : <X className="h-5 w-5 mx-auto text-red-300" />
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0891b2]">FAQ</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-[#0f172a]">
                Frequently asked questions
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-white rounded-2xl border border-gray-200 px-8">
              {FAQS.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA FOOTER ═══ */}
      <section className="py-24 bg-[#0f172a] relative noise-overlay overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0891b2]/10 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Ready to add online booking<br />to your website?
            </h2>
            <p className="mt-6 text-lg text-gray-400 max-w-lg mx-auto">
              Join hundreds of trade businesses getting more bookings with less effort.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/dashboard/onboarding"
                target="_blank"
                className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#0891b2] to-[#06b6d4] text-white font-bold shadow-lg shadow-[#0891b2]/25 hover:shadow-xl hover:shadow-[#0891b2]/35 transition-all hover:scale-[1.02]"
              >
                Get Started Free
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/preview"
                target="_blank"
                className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
              >
                Try the Demo
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              No credit card required. Set up in 5 minutes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#0a0f1a] border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="BookButton" width={60} height={60} />
              <span className="text-white font-bold tracking-tight">
                Book<span className="text-[#22d3ee]">Button</span>
              </span>
            </div>
            <div className="flex items-center gap-8 text-sm text-gray-500">
              <a href="#how-it-works" className="hover:text-[#22d3ee] transition-colors">How it works</a>
              <a href="#industries" className="hover:text-[#22d3ee] transition-colors">Industries</a>
              <a href="#pricing" className="hover:text-[#22d3ee] transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-[#22d3ee] transition-colors">FAQ</a>
              <Link href="/preview" target="_blank" className="hover:text-[#22d3ee] transition-colors">Demo</Link>
            </div>
            <p className="text-sm text-gray-600">
              &copy; 2026 BookButton. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
