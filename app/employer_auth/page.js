"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import { AuthApiError } from "@supabase/supabase-js";
import {
  Briefcase,
  CircleCheck,
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  Mail,
  TrendingUp,
  TriangleAlert,
  LoaderIcon,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

function BrandPanel() {
  return (
    <div className="relative hidden overflow-hidden rounded-l-2xl bg-gradient-to-r from-blue-800 to-purple-500 lg:flex lg:w-130 lg:flex-col lg:justify-center">
      <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl" />

      <div className="relative px-12">
        <h3 className="text-5xl font-extrabold text-white">Your Career,</h3>
        <h1 className="mt-3 text-6xl font-extrabold text-white">Stacked.</h1>
        <p className="mt-4 text-sm text-white/80">
          Join the community of elite professionals
        </p>

        <ul className="mt-10 flex flex-col gap-4 text-white/90">
          <li className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
              <Briefcase size={18} aria-hidden="true" />
            </span>
            <span className="text-sm">Verified jobs from real employers</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
              <Users size={18} aria-hidden="true" />
            </span>
            <span className="text-sm">
              A growing community of professionals
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
              <TrendingUp size={18} aria-hidden="true" />
            </span>
            <span className="text-sm">
              Track your career growth in one place
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function AuthField({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  autoComplete,
  invalid = false,
  trailing = null,
}) {
  return (
    <div
      className={`flex w-full items-center gap-2 rounded-lg border px-3 transition-colors duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30 ${
        invalid
          ? "border-red-400 bg-red-50/40"
          : "border-gray-300 bg-white hover:border-gray-400"
      }`}
    >
      <Icon size={18} className="shrink-0 opacity-70" aria-hidden="true" />
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-label={placeholder}
        aria-invalid={invalid || undefined}
        className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
      />
      {trailing}
    </div>
  );
}

function EyeToggle({ show, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={show ? "Hide password" : "Show password"}
      className="shrink-0 cursor-pointer opacity-70 transition-opacity hover:opacity-100"
    >
      {show ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );
}

const Page = () => {
  const router = useRouter();
  const supabase = createClient();
  const [mode, setMode] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const isSignup = mode === "signup";

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const switchMode = () => {
    clearMessages();
    setPassword("");
    setShowPassword(false);
    setMode(isSignup ? "login" : "signup");
  };

  const googleAuth = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if(data)
    console.log(data);

  
    if (e) {
      console.log("error",e);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (loading) return;
    clearMessages();

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
     const res=data.user
      console.log(data);
      const supabaseEmail=data.user.email
      const supabaseID=data.user.id
     
      if(data?.user){
        // console.log(data.user?.email)

        const result=await fetch("/api/employerRegister",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({supabaseEmail,supabaseID})
        })
        response=await result.json()
        // switchMode(false)
      }
        if(AuthApiError){
     setError("User Already exist ") 
    }
      if (error) {
        console.log(error);
      }

      
     
    } catch(e) {
      console.log("Network error. Please try again.",e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    clearMessages();

    setLoading(true);
    try {
      // const res = await fetch("/api/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     action: "login",
      //     email: email.trim(),
      //     password,
      //   }),
      // });
      // const data = await res.json().catch(() => null);

      // if (res.ok && data?.message === "found") {
      //   router.push("/dashboard");
      //   return;
      // }

      // if (data?.message === "notFound") {
      //   setError("No account found with this email");
      // } else if (data?.message === "failed") {
      //   setError("Wrong password. Please try again.");
      // } else {
      //   setError("Something went wrong. Please try again.");
      // }
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("found", data);
      if(data.user){
      router.push("/dashboard")
      }
      if (error) {
        console.log("error", error.status);
      }
    } catch(error) {
      console.log("Error:",error);
    } finally {
      setLoading(false);
    }
  };
  const [loginCheck,setLoginCheck]=useState(false)

  useEffect(()=>{
    const logged=async()=>{
      try{
    setLoading(true)

      let {data:{user},error}=await supabase.auth.getUser()
      
      if(user){
        setLoginCheck(true)
        router.push("/User")
      }
      else{
        setLoginCheck(false)
      }
      setLoading(false)
    }catch(e){console.log(e)}
    }
    logged()
  
  },[])

  return (
    <div className="flex min-h-[92.3vh] w-full items-center justify-center bg-black px-4 py-8">
    {loading ? <div className="w-full bg-white h-full">
      <LoaderIcon className="h-28 animate-spin"/>
    </div>:
     <div>
     {!loginCheck &&
       <div className="animate-fade-in flex max-w-full w-90 flex-col overflow-hidden rounded-2xl bg-white text-black shadow-2xl shadow-blue-500/10 lg:h-[62vh] lg:w-260 lg:min-h-[60vh] lg:flex-row">
        <BrandPanel />

        <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 lg:w-130">
          <h1 className="font-custom2 text-3xl">
            {isSignup ? "Register" : "Welcome Back"}
          </h1>
          <p className="mt-1 text-xs font-extrabold opacity-60">
            {isSignup
              ? "Create your account to get started"
              : "Sign in to continue your job search"}
          </p>

          <form
            onSubmit={isSignup ? handleSignUp : handleLogin}
            className="mt-6 flex w-full max-w-75 flex-col items-center gap-4"
          >
            <AuthField
              id="email"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
            />

            <AuthField
              id="password"
              type={showPassword ? "text" : "password"}
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              trailing={
                <EyeToggle
                  show={showPassword}
                  onToggle={() => setShowPassword((v) => !v)}
                />
              }
            />

            <div
              className="flex h-5 w-full items-center justify-center"
              aria-live="polite"
            >
              {error ? (
                <h2
                  role="alert"
                  className="flex items-center gap-1 font-custom1 text-sm text-red-500"
                >
                  <TriangleAlert size={14} /> {error}
                </h2>
              ) : success ? (
                <h2 className="flex items-center gap-1 font-custom1 text-sm text-green-600">
                  <CircleCheck size={14} /> {success}
                </h2>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-10 w-50 cursor-pointer items-center justify-center gap-2 rounded-lg bg-black text-xs font-bold tracking-widest text-white transition-all duration-200 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" />
                  {isSignup ? "CREATING..." : "SIGNING IN..."}
                </>
              ) : isSignup ? (
                "CREATE ACCOUNT"
              ) : (
                "SIGN IN"
              )}
            </button>

            <p className="text-xs font-bold">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={switchMode}
                className="ml-2 cursor-pointer text-blue-700 underline-offset-2 transition-colors hover:text-blue-500 hover:underline"
              >
                {isSignup ? "Sign in" : "Create one"}
              </button>
            </p>
            <div className="flex w-full justify-between mt-2">
              <button
                onClick={googleAuth}
                className="flex gap-2 items-center  w-26 rounded shadow justify-center font-semibold"
              >
                <img src="/google.png" alt="" className="h-5" />
                <h2>Google</h2>
              </button>
              <button className="flex gap-2 items-center  w-26 rounded shadow justify-center font-semibold">
                <img src="/google.png" alt="" className="h-5" />
                <h2>Google</h2>
              </button>
            </div>
          </form>
        </div>
      </div>}
       </div>
       } 
      
     
    </div>
  );
};

export default Page;
