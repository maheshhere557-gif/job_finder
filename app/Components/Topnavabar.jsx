"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Bell, LogOut } from "lucide-react";

/* ---------------- Reusable pieces ---------------- */

function IconAction({ href, onClick, label, children }) {
  const className =
    "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-200 transition-all duration-200 hover:bg-white/10 hover:text-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500";

  if (href) {
    return (
      <Link href={href} aria-label={label} title={label} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={label} title={label} className={className}>
      {children}
    </button>
  );
}

const Topnavabar = () => {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const verification = async () => {
      try {
        const res = await fetch("/api/dashboardverify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "verify" }),
        });
        const data = await res.json().catch(() => null);
        if (data?.user?.role) {
          setRole(data.user.role);
          setName(data.user.name ?? "");
        }
      } catch {}
    };

    verification();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/dashboardverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
    } catch {
      /* still clear local state below */
    }
    setRole(null);
    setName("");
    router.push("/");
    router.refresh();
  };

  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-black/90 text-white backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 w-full max-w-screen-2xl items-center justify-between px-4 lg:px-8">
        {/* brand */}
        <Link href="/" className="group flex items-center gap-2">
          <img
            src="/icon.png"
            alt="Job Stack logo"
            className="h-9 w-9 object-contain transition-transform duration-200 group-hover:scale-105 lg:h-11 lg:w-11"
          />
          <span className="font-custom2 text-xl transition-colors duration-200 group-hover:text-yellow-500 lg:text-2xl">
            Job Stack
          </span>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-5">
          {!role && (
            <>
              <Link
                href="/employer_auth"
                className="hidden text-sm font-semibold text-gray-200 transition-colors duration-200 hover:text-yellow-500 sm:block"
              >
                For Employers
              </Link>
              <Link
                href="/Auth"
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-500 px-4 py-1.5 text-sm font-bold text-black shadow-lg shadow-yellow-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-yellow-400 active:scale-95"
              >
                Sign In
              </Link>
            </>
          )}

          {role && (
            <span className="hidden max-w-40 truncate text-sm text-gray-300 md:block">
              Hi, <span className="font-semibold text-white">{name || "there"}</span>
            </span>
          )}

          {role === "employer" && (
            <IconAction href="/Notification" label="Notifications">
              <Bell size={20} />
            </IconAction>
          )}

          <IconAction
            href={role ? "/User" : "/Auth"}
            label={role ? "Your profile" : "Sign in"}
          >
            <User size={22} />
          </IconAction>

          {role && (
            <IconAction onClick={handleLogout} label="Log out">
              <LogOut size={20} />
            </IconAction>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Topnavabar;
