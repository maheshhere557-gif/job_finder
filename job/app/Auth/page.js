'use client'
import React, { useState } from 'react'
import {User,Lock,Mail} from "lucide-react"
import { useRouter } from 'next/navigation';


const page = () => {
  const router=useRouter()
    const [singup,isSignup]=useState(true)
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [c_pass,setC_pass]=useState("")
    const [passmatch,setpassmatch]=useState("")

  

    const handleSignUp=async (e)=>{
      e.preventDefault()
      //Push data 
      if(password!==c_pass){
          setpassmatch("Password not matching !")
      }
      else{
      let data={
       name,email,password
      }

      let response=await fetch("/api/register",{
        method:"POST",
        headers:{"Content-Type":"application/json",},
        body:JSON.stringify(data),
      })

      let result=await response.json()
      console.log(result)
      if(response.ok){
        isSignup(false)
      }
     }
    }
      //get data
      const handleLogin=async(e)=>{
        e.preventDefault()

        const res =await fetch(`/api/register?email=${email}`)
        const resultLogin=await res.json()
        
        setpassmatch("")
        if(resultLogin.message==="success" && resultLogin.data){
          if(resultLogin.data.password==password){
            console.log("password matched with db")
            localStorage.setItem("user Data",JSON.stringify(resultLogin.data))
            
            router.push("/dashboard")

          }
        }
      }
      

    
  return ( 
    <div className='scale-90 mt-7 h-full flex flex-row bg-cover w-full bg-black shadow-black rounded-xl shadow-lg relative ' >
      <div className=' h-[70vh] w-[60vh]  lg:scale-100 hidden lg:block'>
        
        <h1 className="mt-2 ml-55 text-white font-custom3 text-4xl font-medium italic">Job Connect</h1>
        <h1 className="mt-10 ml-15 text-white font-custom3 text-2xl font-medium">Unlock Your Potential</h1>
        <h1 className="mt-7 ml-15 text-white font-custom1 text-xl font-medium">Join thousands of job seekers and connect with top companies worldwide. Create your profile to get started.</h1>
      </div>
      {singup ?(
      <div className=" w-100 mt-2 ml-2 flex flex-col h-[70vh] sm:w-[70vh] pb-10 rounded-xl items-center justify-center border b-gray-100 backdrop-blur-sm" 
      > 
          <h1 className=" mt-14 font-bold animate-bounce  text-white text-center  scale-200">Sign Up</h1>
          <form onSubmit={handleSignUp}>
            <div className='mt-9 flex flex-col justify-center items-center'>

            <div className='relative w-[35vh]'>
              <input 
              name="name"
              type="text" 
              placeholder="Username"
              required
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className=' pl-7 mt-9 rounded-lg w-full h-[40px] border-b-2 outline-none bg-white border-white pl-2'/>
              <User 
              color='black' 
              className='absolute top-11 opacity-70 ' />
            </div>

            <div className='relative w-[35vh]'>
              <input 
              name="email"
              type="email" 
              onChange={(e)=>setEmail(e.target.value)}
              required
              value={email}
              placeholder="Email"
              className=' pl-7 mt-9 rounded-lg w-full h-[40px] border-b-2 outline-none bg-white border-white pl-2'/>
              <Mail 
              color='black' 
              className='absolute top-11 opacity-70' />
            </div>

            <div className='relative w-[35vh]'>
              <input 
              name="password"
              type="password"
              required
              value={password}
              onChange={(e=>setPassword(e.target.value))}
              placeholder="Password" 
              className=' pl-7 mt-9 rounded-lg w-full h-[40px] border-b-2 outline-none bg-white border-white pl-2'/>
              <Lock 
              color='black' 
              className='absolute top-11 opacity-70' />
            </div>

            <div className='relative w-[35vh]'>
              <input 
              name="confirm_password"
              id="Confirm-pass"
              type="password" 
              required
              value={c_pass}
              onChange={(e)=>setC_pass(e.target.value)}
              placeholder="Confirm password"
              className=' pl-7 mt-9 rounded-lg w-full h-[40px] border-b-2 outline-none bg-white border-white pl-2'/>
              <Lock 
              color='black' 
              className='absolute top-11 opacity-70' />
            </div>
          <h3 className="text-white text-smv mr-40">{passmatch}</h3>
          
         
             <button type="submit" className='cursor-pointer scale-96 hover:scale-100 transition hover:font-lg font-medium hover:font-bold border mt-10 w-[90px] h-[40px] text-black bg-white rounded-lg'>Sign In</button>
        
          <div className="flex text-white mt-2 drop-shadow-[0px_3px_purple] hover:blur-[0.5px]  ">
              <h2>Already Have An Account </h2>
              <h3 onClick={()=>isSignup(false)} className=" ml-2 border-b-2 border-blue cursor-pointer transition">Log In</h3>
              </div>
              
            </div>
          </form>
        </div>

        ):(

        <div className=" w-100 mt-2 ml-2 flex flex-col h-[70vh] sm:w-[70vh] pb-10 rounded-xl items-center justify-center border b-gray-100 backdrop-blur-sm" 
      >
          <h1 className=" mt-12 font-bold animate-bounce  text-white text-center  scale-200">Log In</h1>
          <form onSubmit={handleLogin}>
          <div className='mt-10 flex flex-col justify-center items-center'>

            <div className='relative w-[35vh]'>
              <input 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="email" 
              required
              placeholder="Email"
              className=' pl-7 mt-9 rounded-lg w-full h-[40px] border-b-2 outline-none bg-white border-white pl-2'/>
              <Mail 
              color='black' 
              className='absolute top-11 opacity-70' />
            </div>

            <div className='relative w-[35vh]'>
              <input 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              type="password"
              required
              placeholder="Password" 
              className=' pl-7 mt-9 rounded-lg w-full h-[40px] border-b-2 outline-none bg-white border-white pl-2'/>
              <Lock 
              color='black' 
              className='absolute top-11 opacity-70' />
            </div>

           
            
            <button type='submit' className='cursor-pointer scale-96 hover:scale-100 transition hover:font-lg font-medium hover:font-bold border mt-10 sm:w-[90px] h-[40px] text-black bg-white rounded-lg'>Sign In</button>
          </div>
          </form>
          <div className="flex text-white mt-5 drop-shadow-[0px_3px_purple] hover:blur-[0.5px]  ">
              <h2>Don't Have An Account </h2>
              <h3 onClick={()=>isSignup(true)} className=" ml-2 border-b-2 border-blue cursor-pointer "> Sign Up</h3>
              </div>
        </div>
       ) }
    </div>
  )
}

export default page
