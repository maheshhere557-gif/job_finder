"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  Camera,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  LoaderCircle,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Share2,
  Users,
} from "lucide-react";
const page = () => {
  const supabase = createClient();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarInitial, setAvatarInitial] = useState("U");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (!error && user) {
          const targetEmail = user.email ?? "";
          setEmail(targetEmail);

          const rawName = user.user_metadata?.full_name || user.user_metadata?.name || "";
          const parts = rawName.split(/\s+/).filter(Boolean);
          setFirstName(parts[0] ?? "");
          setLastName(parts.slice(1).join(" ") ?? "");
          if (parts.length) {
            setAvatarInitial(parts[0].charAt(0).toUpperCase());
          }

          const metaPhone =
            user.user_metadata?.phone ?? user.phone ?? "";
          setPhone(metaPhone);
        }
      } catch {
        /* keep empty state */
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [supabase]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/");
  };

  const fullName =
    [firstName, lastName].filter(Boolean).join(" ") || email?.split("@")[0] || "Job Stack User";

  const infoFields = [
    { icon: Mail, label: "Email", value: email },
    { icon: Phone, label: "Phone", value: phone },
    { icon: MapPin, label: "Location", value: "" },
    { icon: Briefcase, label: "Role", value: role },
  ];

  const stats = [
    { label: "Applications", value: "—" },
    { label: "Saved Jobs", value: "—" },
    { label: "Profile Views", value: "—" },
  ];

  return (
    <div className="mx-auto flex w-full min-h-[92.3vh] max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6">
      {/* header card */}
      <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-r from-black via-zinc-900 to-zinc-800 p-6 shadow-md sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-yellow-500/15 blur-3xl" />

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <LoaderCircle size={28} className="animate-spin text-yellow-500" aria-hidden="true" />
          </div>
        ) : (
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
{/* avatar */}
            <div className="group relative h-20 w-20 shrink-0">
              {avatar ? (
                <img
                  src={avatar}
                  alt=""
                  className="h-20 w-20 rounded-full border-4 border-white/10 object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/10 bg-yellow-500 text-3xl font-extrabold text-black"
                >
                  {avatarInitial}
                </span>
              )}
              <button
                type="button"
                aria-label="Change profile photo"
                className="absolute -bottom-1 -right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-600 bg-white text-gray-700 shadow transition-colors hover:text-yellow-600"
              >
                <Camera size={15} aria-hidden="true" />
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-2xl font-extrabold text-white sm:text-3xl">
                {fullName}
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-300">
                <span className="truncate">{email || "No email linked yet"}</span>
                <span className="hidden h-1 w-1 rounded-full bg-gray-500 sm:inline-block" />
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-yellow-500" aria-hidden="true" />
                  Active profile
                </span>
              </div>
              {role && (
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-yellow-500/40 bg-yellow-500/15 px-3 py-1 text-xs font-bold text-yellow-400">
                  {role === "employer" ? <Building2 size={13} /> : <Users size={13} />}
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </span>
              )}
            </div>

            {/* actions */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Share profile"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 text-gray-200 transition-colors hover:border-yellow-500/60 hover:text-yellow-500"
              >
                <Share2 size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full bg-yellow-500 px-4 text-sm font-bold text-black transition-all duration-200 hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loggingOut ? (
                  <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
                ) : (
                  <LogOut size={16} aria-hidden="true" />
                )}
                {loggingOut ? "Logging out..." : "Log out"}
              </button>
            </div>
          </div>
        )}
      </section>
{/* stats */}
      <section
        aria-label="Profile statistics"
        className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
          >
            <span className="text-sm font-semibold text-gray-600">{stat.label}</span>
            <span className="text-2xl font-extrabold text-yellow-600">{stat.value}</span>
          </div>
        ))}
      </section>

      <div className="grid w-full grid-cols-1 items-start gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <FileText size={18} className="text-yellow-600" aria-hidden="true" />
                About Me
              </h2>
              <button
                type="button"
                className="flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-500"
              >
                <Pencil size={14} aria-hidden="true" />
                Edit
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Add a short summary about your experience, skills, and career goals to help
              employers understand who you are. This section will update once you complete
              your profile details.
            </p>
          </section>

          {/* skills */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <GraduationCap size={18} className="text-yellow-600" aria-hidden="true" />
                Skills & Education
              </h2>
              <button
                type="button"
                className="flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-500"
              >
                <Pencil size={14} aria-hidden="true" />
                Edit
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Communication", "Problem Solving", "Teamwork", "Adaptability"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-sm font-semibold text-yellow-700"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Add your qualification and key skills to stand out to recruiters.
            </p>
          </section>
        </div>
{/* right column: contact + quick links */}
        <div className="flex flex-col gap-5">
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <Mail size={18} className="text-yellow-600" aria-hidden="true" />
              Contact Info
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {infoFields.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-600">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {label}
                    </p>
                    <p className="truncate text-sm font-medium text-gray-800">
                      {value || "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-black py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
            >
              <Pencil size={14} aria-hidden="true" />
              Edit Profile
            </button>
          </section>

          {/* quick links */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400">
              Quick Links
            </h2>
            <div className="mt-3 flex flex-col">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-xl px-2 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-yellow-600"
              >
                <Briefcase size={16} className="text-yellow-600" aria-hidden="true" />
                Browse Jobs
              </Link>
              {role === "employer" ? (
                <Link
                  href="/Notification"
                  className="flex items-center gap-2 rounded-xl px-2 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-yellow-600"
                >
                  <Clock3 size={16} className="text-yellow-600" aria-hidden="true" />
                  Notifications
                </Link>
              ) : (
                <Link
                  href="/sendApplication"
                  className="flex items-center gap-2 rounded-xl px-2 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-yellow-600"
                >
                  <FileText size={16} className="text-yellow-600" aria-hidden="true" />
                  My Applications
                </Link>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default page;
