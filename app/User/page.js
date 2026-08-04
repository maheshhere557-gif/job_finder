'use client'
import React, { useEffect, useState } from 'react'
import {User,LogOut,FilePlus} from "lucide-react"
import Link from 'next/link'
import {useRouter} from "next/navigation"
const page = () => {
  const [role,setRole]=useState(null);
  const [username,setName]=useState("")
  const router=useRouter()
  useEffect(()=>{
   

   verification()
  },[])

  const verification =async ()=>{
        try{
          
        let res = await fetch("/api/dashboardverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({action:"verify"})
      });

      let data= await res.json()
      console.log(data)
      if(data&&data.user&&data.user.role){
        setRole(data.user.role)
        setName(data.user.name)
        console.log(username)
    }
    else{
      router.push("/Auth")
    }
  }catch(e){
    
  }
}

 
const handleLogOut= async ()=>{
    try{
     let res = await fetch("/api/dashboardverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({action:"logout"})
    });

    if(res.ok)
      router.push("/")
    
    }catch(e){
      console.log("error:",e)
    }
  }
  
  return (
    <div className='bg-black/10 ' >
        {role=='employee' &&( <div className=' flex flex-col items-center mt-5 w-100 h-150 bg-blur-lg border rounded-lg '>
          <User className='size-25 mt-5'/>
          <h1 className='text-lg mt-2 font-custom1'> Welcome {username},</h1>
          <div className='flex border-b w-50 h-10 items-center justify-center mt-10'>
            <User className='mr-3'/>
            <h3 className=' '>My Profile</h3>
            </div>
            <div >
            
            </div>
            <div className='flex border-b w-50 h-10 items-center justify-center mt-10'>
            <LogOut className='mr-3'/>
            <button className='cursor-pointer' onClick={handleLogOut}>Log Out</button>
            </div>
          
           
           
        </div>)}
        {role=='employer'&&( <div className=' flex flex-col items-center mt-5 w-100 h-150 bg-blur-lg border rounded-lg '>
          <User className='size-25 mt-5'/>
          <h1 className='text-lg mt-2 font-custom1'> Welcome Employer,</h1>
          <div className='flex border-b w-50 h-10 items-center justify-center mt-10'>
            <User className='mr-3'/>
            <h3 className=' '>My Profile</h3>
            </div>
            <div >
            <Link href='/AddJob' className='flex border-b w-50 h-10 items-center justify-center mt-10'>
            <FilePlus className='mr-3'/>
            <h3 className=' '>Post Job</h3>
            </Link>
            </div>
            <div className='flex border-b w-50 h-10 items-center justify-center mt-10'>
            <LogOut className='mr-3'/>
            <button className='cursor-pointer' onClick={handleLogOut}>Log Out</button>
            </div>
          
           
           
        </div>)}

        {role=='admin'&&( <div className=' flex flex-col items-center mt-5 w-100 h-150 bg-blur-lg border rounded-lg '>
          <User className='size-25 mt-5'/>
          <h1 className='text-lg mt-2 font-custom1'> Welcome Admin,</h1>
          <div className='flex border-b w-50 h-10 items-center justify-center mt-10'>
            <User className='mr-3'/>
            <h3 className=' '>My Profile</h3>
            </div>
            <div >
            <Link href='/admin-only/admin-dashboard' className='flex border-b w-50 h-10 items-center justify-center mt-10'>
            <FilePlus className='mr-3'/>
            <h3 className=' '>Verify Jobs</h3>
            </Link>
            </div>
            <div className='flex border-b w-50 h-10 items-center justify-center mt-10'>
            <LogOut className='mr-3'/>
            <button className='cursor-pointer' onClick={handleLogOut}>Log Out</button>
            </div>
          
           
           
        </div>)}

          
        
    </div>
  )
}

export default page
