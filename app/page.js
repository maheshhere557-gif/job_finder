"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  ShieldCheck,
} from "lucide-react";

function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <img
        src="/homebg.jpeg"
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    </div>
  );
}

function CtaLink({ href, primary = false, children }) {
  const base =
    "inline-flex h-13 w-45 cursor-pointer items-center justify-center gap-2 rounded-2xl text-base font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95";
  return (
    <Link
      href={href}
      className={
        primary
          ? `${base} bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 hover:bg-yellow-400`
          : `${base} border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20`
      }
    >
      {children}
    </Link>
  );
}

function StatCard({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm transition-colors hover:border-yellow-500/40">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yellow-500/15 text-yellow-500">
        <Icon size={18} aria-hidden="true" />
      </span>
      <span className="text-sm font-semibold text-gray-200">{children}</span>
    </div>
  );
}

export default function Home() {
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [jobCount, setJobCount] = useState(null);

  useEffect(() => {
   
    const loadJobCount = async () => {
      try {
        const res = await fetch("/api/Jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fetching: "true" }),
        });
        const data = await res.json().catch(() => null);
        if (Array.isArray(data)) setJobCount(data.length);
      } catch {}
    };

    loadJobCount();
  }, []);

  const badgeText = !role
    ? "Start Your Journey"
    : role === "admin"
      ? "Admin Mode"
      : `Welcome ${name}`;

  const ctas = [];
  if (!role) {
    ctas.push({ href: "/Auth", label: "Sign Up", primary: true });
    ctas.push({ href: "/employer_auth", label: "For Employers", primary: false });
  } else if (role === "employee") {
    ctas.push({ href: "/dashboard", label: "Access Dashboard", primary: true });
  } else if (role === "employer") {
    ctas.push({ href: "/dashboard", label: "Access Dashboard", primary: true });
    ctas.push({ href: "/AddJob", label: "Post Job", primary: false });
  } else if (role === "admin") {
    ctas.push({
      href: "/admin-only/admin-dashboard",
      label: "Open Admin Panel",
      primary: true,
    });
  }

  return (
    <section className="relative isolate flex min-h-[92.3vh] w-full items-center overflow-hidden">
      <HeroBackground />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-16 md:px-12 lg:px-20">
        <div className="animate-fade-in max-w-3xl">
          <h2 className="inline-flex items-center gap-2 rounded-full border border-yellow-500/50 bg-yellow-500/10 px-5 py-1.5 text-sm font-bold text-yellow-500">
            <span className="h-2 w-2 rounded-full bg-yellow-500" />
            {badgeText}
          </h2>

          <h1 className="mt-8 text-4xl leading-tight font-extrabold text-white sm:text-5xl lg:text-6xl">
            Discover Your <span className="text-yellow-500">Next</span>
            <br />
            <span className="text-yellow-500">Big</span>{" "}
            <span className="text-white">Opportunity,</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-gray-300">
            Explore curated vacancies tailored specifically to your expertise.
            Take the definitive next step in your professional journey today.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {ctas.map((cta) => (
              <CtaLink key={cta.href} href={cta.href} primary={cta.primary}>
                {cta.label}
                {cta.primary && <ArrowRight size={18} aria-hidden="true" />}
              </CtaLink>
            ))}
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard icon={Briefcase}>
              {jobCount === null ? "Explore Open Roles" : `${jobCount} Open Positions`}
            </StatCard>
            <StatCard icon={Building2}>Top Companies Hiring</StatCard>
            <StatCard icon={ShieldCheck}>100% Free for Seekers</StatCard>
          </div>
        </div>
      </div>
    </section>
  );
}
