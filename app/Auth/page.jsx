"use client";
import React, { useState } from "react";
import { User, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const [singup, isSignup] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_pass, setC_pass] = useState("");
  const [passmatch, setpassmatch] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    setpassmatch("");

    if (password !== c_pass) {
      setpassmatch("password does not match");
      return;
    } else {
      let response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register", name, email, password }),
      });

      let result = await response.json();
      if (result.message == "exist") {
        setpassmatch(" ! email already exist ");
      }

      if (result.message == "registered") {
        isSignup(false);
      }
      setName("");
      setPassword("");
    }
  };
  //get data

  const handleLogin = async (e) => {
    e.preventDefault();
    setpassmatch("");

    let res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", email, password }),
    });
    let data = await res.json();
    if (res.ok) {
      router.push("/dashboard");
    } else {
      if (data.message == "notFound") {
        setpassmatch("User not found");
        
      } else {
        setpassmatch("Wrong Password");

      }
    }
  };

  return (
    <div className="w-full h-[92.2vh] lg:h-[92.3vh] flex items-center justify-center bg-black">
      {singup ? (
        <div className="flex text-black bg-white w-90 h-[60vh] rounded-2xl  lg:w-260">
          <div className="lg:w-130 hidden bg-gradient-to-r from-blue-800 to-purple-500 rounded-2xl   lg:flex lg:flex-col">
            <h3 className=" mt-30 ml-30 text-5xl font-extrabold text-white">
              Your Career,
            </h3>
            
            <h1 className="mt-5 ml-34 text-6xl font-extrabold text-white">
              Stacked.
            </h1>

            <h1 className="mt-5 ml-34 text-small text-white opacity-80" >
              Join the community of elite professionals
            </h1>
          </div>

          <div className="lg:w-130 flex flex-col items-center justify-center ">
            <h2 className=" font-custom2 text-3xl mb-5 animate-bounce ">
              Register
            </h2>
            <h2 className=" text-sm font-extrabold opacity-60 ">
            Create your account to get started
            </h2>
            <div className="lg:scale-110">
              <form
                onSubmit={handleSignUp}
                className=" mt-5 w-90 flex flex-col items-center"
              >
                <div className="relative h-5 mt-5 ">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    type="text"
                    className="border h-8 w-60 rounded-lg pl-7"
                    placeholder="Username"
                  />
                  <User className="relative bottom-7 opacity-70" />
                </div>

                <div className="relative h-5 mt-8">
                  <input
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="border h-8 w-60 rounded-lg pl-7"
                    placeholder="Email"
                  />
                  <Mail className="relative bottom-7  h-5 opacity-70" />
                </div>

                <div className="relative h-5 mt-8">
                  <input
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="border h-8 w-60 rounded-lg pl-7"
                    placeholder="Password"
                  />
                  <Lock className="relative bottom-7 h-5 opacity-70" />
                </div>

                <div className="relative h-5 mt-8">
                  <input
                    value={c_pass}
                    required
                    onChange={(e) => setC_pass(e.target.value)}
                    type="password"
                    className="border h-8 w-60 rounded-lg pl-7"
                    placeholder="Confirm Password"
                  />
                  <Lock className="relative bottom-7 h-5 opacity-70" />

                  <h2 className=" mt-[-18] font-custom1 scale-75 pt-[-2] text-blue-400">
                    {passmatch}
                  </h2>
                </div>

                <button
                  type="submit"
                  className="border mt-8 w-50 h-9  rounded-lg bg-black text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  SUBMIT
                </button>

                <div className="flex mt-3 scale-80 font-bold ">
                  <h2 className="">Already Have An Account </h2>
                  <button
                    onClick={() => isSignup(false)}
                    className=" ml-2 text-blue-700  cursor-pointer" 
                    type="button"
                  >
                    Click here
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
       <div className="flex text-black bg-white w-90 h-[60vh] rounded-2xl  lg:w-260">
          <div className="lg:w-130 hidden bg-gradient-to-r from-blue-800 to-purple-500 rounded-2xl   lg:flex lg:flex-col">
            <h3 className=" mt-30 ml-30 text-5xl font-extrabold text-white">
              Your Career,
            </h3>
            
            <h1 className="mt-5 ml-34 text-6xl font-extrabold text-white">
              Stacked.
            </h1>

            <h1 className="mt-5 ml-34 text-small text-white opacity-80" >
              Join the community of elite professionals
            </h1>
          </div>

          <div className="lg:w-130 flex flex-col items-center justify-center ">
            <h2 className=" font-custom2 text-3xl mb-5 animate-bounce ">
              Register
            </h2>
            <h2 className=" text-sm font-extrabold opacity-60 ">
            Create your account to get started
            </h2>
            <div className="lg:scale-110">
              <form
                onSubmit={handleLogin}
                className=" mt-5 w-90 flex flex-col items-center"
              >
                

                <div className="relative h-5 mt-8">
                  <input
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="border h-8 w-60 rounded-lg pl-7"
                    placeholder="Email"
                  />
                  <Mail className="relative bottom-7  h-5 opacity-70" />
                </div>

                <div className="relative h-5 mt-8">
                  <input
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="border h-8 w-60 rounded-lg pl-7"
                    placeholder="Password"
                  />
                  <Lock className="relative bottom-7 h-5 opacity-70" />
                </div>

                  <h2 className=" font-custom1 scale-75 mt-2 animate-fade-in text-blue-400">
                    {passmatch}
                  </h2>
                <button
                  type="submit"
                  className="border mt-8 w-50 h-9  rounded-lg bg-black text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  SUBMIT
                </button>

                

                <div className="flex mt-3 scale-80 font-bold ">
                  <h2 className="">Already Have An Account </h2>
                  <button
                    onClick={() => isSignup(true)}
                    className=" ml-2 text-blue-700  cursor-pointer" 
                    type="button"
                  >
                    Click here
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
