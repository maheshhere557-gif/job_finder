'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
const page = () => {
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const[status,setstatus]=useState("")
const router=useRouter()

  let onsubmit=async(e)=>{
    e.preventDefault()
    setstatus("")
    let res=await fetch('/admin-only/api',{
      method:"POST",
      headers:{"Content-type":"application/json"},
      body: JSON.stringify({email,password})
    })

    let data=await res.json()
    if(data.message === "success" ){
      router.push('/admin-only/admin-dashboard')
    }else{
      setstatus("UserNot Found")
    }
    if(data.message === "incorrectpass"){
      setstatus("Wrong pass")
    }
  }
  return (
    <div className='bg-black h-[92.3vh] text-white flex items-center justify-center'>
      <div className='bg-zinc-900 h-[60vh] w-[50vh] rounded-lg bg-zinc-800  text-center'>
      <form onSubmit={onsubmit}>
        <h1 className='font-extrabold text-3xl mt-1'>Admin Login</h1>
        <h1 className='opacity-70 scale-80 mt-1'>Authorized Access Only </h1>
       <div className='relative mt-10' >
      <h1 className='absolute mt-5 ml-5 opacity-70 scale-80'>Email</h1>
      <input type="email" name={email} onChange={e=>setemail(e.target.value)} placeholder='admin123@gmail.com' className=" pl-4 w-[45vh] bg-white text-black mt-10 rounded-lg h-[5vh] text-sm" required/>
      </div>
      <div className='relative'>
      <h1 className='absolute mt-5 ml-5 opacity-70 scale-80'>Password</h1>
      <input type="password" name={password} onChange={e=>setpassword(e.target.value)} placeholder='********' className=" pl-4 w-[45vh] bg-white text-black mt-10 rounded-lg h-[5vh] text-sm" required/>
        <h2 className='ml-10 scale-70 absolute'>{status}</h2>
      </div>
      
      <button type='submit' className='w-[40vh] h-[5vh] border cursor-pointer mt-10 bg-yellow-500 text-black rounded-lg '>Login To Dashboard</button>
      
      </form>
      <Link href="/" >
        <div className='opacity-70 mt-3 scale-80'>⬅back Home</div></Link>
    </div>
    </div>
  )
}

export default page
