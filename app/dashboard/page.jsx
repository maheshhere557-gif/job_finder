"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

/* ---------------- Reusable pieces ---------------- */

function DetailRow({ label, value }) {
  return (
    <p className="truncate text-sm text-gray-600">
      <span className="font-semibold opacity-80">{label}: </span>
      {value ?? "—"}
    </p>
  );
}

/* ---------------- Page ---------------- */

const Dashboard = () => {
  const router = useRouter();
  const [jobs, setJob] = useState([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [inputdata, setInput] = useState("");
  const [loadingJobs, setLoadingJobs] = useState(true);

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
        //  else {
        //   router.push("/");
        // }
      } catch {
        router.push("/");
      }
    };

    const displayAll = async () => {
      try {
        const res = await fetch("/api/Jobs", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fetching: "true" }),
        });
        const data = await res.json().catch(() => null);
        if (res.ok && Array.isArray(data)) setJob(data);
      } catch {
        /* keep empty state */
      } finally {
        setLoadingJobs(false);
      }
    };

    verification();
    displayAll();
  }, [router]);

  const query = inputdata.trim().toLowerCase();
  const filtered = jobs.filter((job) =>
    [job?.JobName, job?.Company_name, job?.Qualification, job?.Address].some(
      (field) => field?.toLowerCase().includes(query)
    )
  );

  return (
    <div className="mx-auto flex min-h-[92.3vh] w-full max-w-6xl flex-col gap-5 px-4 py-5 sm:px-6">
      {/* safety banner (visible on all screens now) */}
      <div className="flex items-center justify-center gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-2.5 text-center text-xs text-gray-800 sm:text-sm">
        <span aria-hidden="true">🛡️</span>
        <p>
          Genuine employers never ask for money for interviews or training.
          Stay safe! <span className="cursor-pointer font-semibold underline underline-offset-2 hover:text-yellow-700">learn more</span>
        </p>
      </div>

      {/* greeting */}
      {role && (
        <h1 className="text-lg font-bold sm:text-xl">
          {role === "employee"
            ? `Hello ${name}, let's find a job for you`
            : `Hello ${name}`}
        </h1>
      )}

      {/* search */}
      <div className="relative z-20 w-full max-w-xl self-center">
        <Search
          size={20}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          aria-hidden="true"
        />
        <input
          type="text"
          value={inputdata}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search by role, company, qualification"
          aria-label="Search jobs"
          className="h-11 w-full rounded-full border border-gray-300 bg-white/95 pl-11 pr-10 text-sm outline-none transition-all duration-200 placeholder:text-gray-400 hover:shadow-md focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30"
        />

        {inputdata && (
          <button
            type="button"
            onClick={() => setInput("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}

        {/* suggestions dropdown, anchored to the input */}
        {query !== "" && filtered.length > 0 && (
          <ul className="absolute inset-x-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-xl">
            {filtered.slice(0, 8).map((job) => (
              <li key={job._id}>
                <button
                  type="button"
                  onClick={() => setInput(job?.JobName || "")}
                  className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-yellow-50"
                >
                  <Search size={14} className="shrink-0 opacity-50" aria-hidden="true" />
                  <span className="truncate">{job.JobName}</span>
                  <span className="ml-auto shrink-0 truncate pl-2 text-xs text-gray-400">
                    {job.Company_name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* jobs */}
      <div className="grid w-full grid-cols-1 content-start gap-5 xl:grid-cols-2">
        {loadingJobs ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-2xl border border-gray-200 bg-gray-100"
              aria-hidden="true"
            />
          ))
        ) : filtered.length > 0 ? (
          filtered.map((job) => (
            <article
              key={job._id}
              className="flex w-full flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-xl sm:flex-row sm:items-center"
            >
              <span className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                <img
                  src="/job.webp"
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                />
              </span>

              <div className="min-w-0 flex-1 space-y-0.5">
                <h3 className="truncate text-base font-bold text-yellow-600">
                  {job.JobName}
                </h3>
                <DetailRow label="Company" value={job.Company_name} />
                <DetailRow label="Qualification" value={job.Qualification} />
                <DetailRow label="Salary" value={job.Salary ? `₹ ${job.Salary}` : "—"} />
                <DetailRow label="Address" value={job.Address} />
              </div>

              {(role === "employee" || role === "employer") && (
                <div className="shrink-0 sm:w-32">
                  <Link
                    href={role === "employee" ? "/sendApplication" : "/AddJob"}
                    className="flex h-10 w-full cursor-pointer items-center justify-center rounded-full border border-yellow-500/50 bg-yellow-400 font-semibold text-black transition-all duration-200 hover:bg-yellow-500 active:scale-95 sm:text-sm"
                  >
                    {role === "employee" ? "Apply Now" : "Post a Job"}
                  </Link>
                </div>
              )}
            </article>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-300 py-16 text-center">
            <Briefcase size={36} className="text-gray-300" aria-hidden="true" />
            <p className="font-semibold text-gray-500">
              {query
                ? `No jobs match "${inputdata.trim()}"`
                : "No jobs available right now"}
            </p>
            {query && (
              <button
                type="button"
                onClick={() => setInput("")}
                className="cursor-pointer text-sm font-semibold text-blue-600 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
