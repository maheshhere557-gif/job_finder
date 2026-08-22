"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Home() {
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  useEffect(() => {
    verification();
  }, []);

  const verification = async () => {
    try {
      let res = await fetch("/api/dashboardverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify" }),
      });

      let data = await res.json();
      console.log(data);
      if (data && data.user && data.user.role) {
        setRole(data.user.role);
        setName(data.user.name);
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <div className=" md:h-[55.4vh] w-full b-0 flex top-0 ">
      {role == "employee" && (
        <div className="">
          <img
            src="/homebg.jpeg"
            className="absolute  object-contain w-full h-screen lg:w-full lg:h-[689.5px] -z-10"
          />
          <div className="relative scale-90  mt-25 lg:ml-20  lg:h-125 lg:w-175 ">
            <h1 className=" text-yellow-500 border w-50  lg:w-60 flex items-center justify-center border-yellow-500/50 bg-yellow-500/10  rounded-full ">
              Welcome {name}
            </h1>
            <h1 className=" text-white text-4xl lg:text-6xl font-extrabold mt-15">
              Discover Your <span className="text-yellow-500">Next</span>
            </h1>
            <h1 className=" text-yellow-500 text-5xl font-extrabold mt-3">
              Big <span className=" text-white">Opportunity,</span>
            </h1>
            <p className="text-xl text-gray-300 hidden  mt-20">
              Explore curated vacancies tailored specifically to your expertise.
              Take the definitive next step in your professional journey today.
            </p>
            <Link href="/dashboard">
              <button className="text-black lg:mt-20 lg:ml-20 border bg-yellow-500 ml-5 h-15 w-40 lg:h-15 lg:w-50 rounded-2xl mt-15 ">
                {" "}
                Access Dashboard
              </button>
            </Link>
          </div>
        </div>
      )}

      {role == "employer" && (
        <div>
          <img
            src="/homebg.jpeg"
            className="absolute object-cover object-contain w-full h-screen lg:w-full lg:h-[689.5px] -z-10"
          />

          <div className="relative mt-30 lg:ml-20 scale-90  lg:h-[500px] lg:w-[700px] ">
            <h1 className=" text-yellow-500 border w-60  lg:w-60 flex items-center justify-center border-yellow-500/50 bg-yellow-500/10  rounded-full ">
              Welcome {name}
            </h1>
            <h1 className=" text-white text-4xl lg:text-6xl font-extrabold mt-3">
              Discover Your <span className="text-yellow-500">Next</span>
            </h1>
            <h1 className=" text-yellow-500 text-5xl font-extrabold mt-3">
              Big <span className=" text-white">Opportunity,</span>
            </h1>
            <p className="text-xl text-gray-300  mt-20">
              Explore curated vacancies tailored specifically to your expertise.
              Take the definitive next step in your professional journey today.
            </p>
            <Link href="/dashboard">
              <button className="text-black lg:mt-20 lg:ml-20 border bg-yellow-500 ml-5 h-15 w-40 lg:h-15 lg:w-50 rounded-2xl mt-15 ">
                {" "}
                Access Dashboard
              </button>
            </Link>
            <Link href="/AddJob">
              {" "}
              <button className="text-white lg:mt-20 lg:ml-30 border bg-blurr-sm  border-white/20 h-15 h-15 w-40 lg:h-15 lg:w-50 ml-9 rounded-2xl  ">
                Post Job
              </button>
            </Link>
          </div>
        </div>
      )}

      {role == "admin" && (
        <div>
          <img
            src="/homebg.jpeg"
            className="absolute object-cover object-contain w-full h-screen lg:w-full lg:h-[689.5px] -z-10"
          />

          <div className="relative mt-30 lg:ml-20 scale-90  lg:h-[500px] lg:w-[700px] ">
            <h1 className=" text-white text-4xl lg:text-6xl font-extrabold mt-3">
              Lopper<span className="text-yellow-500">Admin</span>
            </h1>
          </div>
        </div>
      )}
      {!role && (
        <div className="w-full h-full">
          <img
            src="/homebg.jpeg"
            className="absolute object-cover w-full h-full lg:w-full lg:h-[689.5px] -z-10"
          />
          <div className="relative scale-90 w-full mt-25 md:ml-20  md:h-125 md:w-175 ">
            <h1 className=" text-yellow-500 border w-50  lg:w-60 flex items-center justify-center border-yellow-500/50 bg-yellow-500/10  rounded-full text-bold ">
              Authentication
            </h1>
            <h1 className=" text-white text-4xl lg:text-6xl font-extrabold mt-15">
              Discover Your <span className="text-yellow-500">Next</span>
            </h1>
            <h1 className=" text-yellow-500 text-5xl font-extrabold mt-3">
              Big <span className=" text-white">Opportunity,</span>
            </h1>
            <p className="text-xl text-gray-300  mt-20">
              Explore curated vacancies tailored specifically to your expertise.
              Take the definitive next step in your professional journey today.
            </p>
            <Link href="/Auth">
              <button className="text-black lg:mt-20 lg:ml-20 border bg-yellow-500 ml-5 h-15 w-40 lg:h-15 lg:w-50 text-2xl rounded-2xl mt-15 ">
                Sign Up
              </button>
            </Link>
            {/* <Link href="/admin-only/auth">
              <button className=" text-white ml-320 h-20 w-50 cursor-pointer"></button>
            </Link> */}
          </div>
        </div>
      )}
    </div>
  );
}
