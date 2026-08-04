'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {AlertTriangle} from "lucide-react"
const page = () => {
  const [Company_name,isCompany_name]=useState('')
  const [Qualification,isQualification]=useState('')
  const [Salary,isSalary]=useState('')
  const [JobName,setJobName]=useState('')
  const [Address,isAddress]=useState('')
  const [description,isdescription]=useState('')
  const [role,setRole]=useState(null)
 const [ide,setId]=useState("")
 const [name,setName]=useState("")

let router= useRouter()



useEffect(()=>{
  const verification=async ()=>{
    let res = await fetch("/api/dashboardverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({action:"verify"})
    });
  const data=await res.json()
    if(data&&data.user&&data.user.role){
      setName(data.user.name)
      setRole(data.user.role)
      setId(data.user.ide)
    }
  }

  verification()
},[])


  async function Pushdata(e){
    e.preventDefault()

      
    



    let response=await fetch("/api/Jobs",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ide,
        action:"Add",
        Company_name,
        Qualification,
        JobName,
        Salary,
        Address,
        description,
      

  status:"no",})

    })
  setRole("employer")
    let data=await response.json()
    if(data.message=="success"){
      
      router.push("/dashboard")
    }
  }
  return (
    <div className='h-[92.3vh] items-center flex justify-center'>
      {role=="employer" ? (
      <div className=' h-150 w-100 flex items-center flex-col rounded-lg border border-gray-500/50 shadow-2xl'>
        <h3 className='text-3xl font-extrabold  mt-3 opacity-85'>Hello {name}, Post A New Job</h3>
        <h3 className='text-sm opacity-70  mt-3 '>Fill in the details to find best talent</h3>
        <div className=' h-full  flex w-full justify-center'>
          <form  onSubmit={Pushdata} className='w-full flex flex-col items-center mt-10'>
            <input onChange={(e)=>isCompany_name(e.target.value)} value={Company_name} className='border outline-none placeholder:text-slate-400 rounded-lg bg-gray-500/10 h-10 pl-5 w-70 ' placeholder=' Company Name' required/>
            <input  onChange={(e)=>isQualification(e.target.value)} value={Qualification}  className='border mt-5 rounded-lg bg-gray-500/10 h-10 pl-5 w-70 placeholder:text-slate-400 ' placeholder='Qualification' required/>
            <input  onChange={(e)=>setJobName(e.target.value)} value={JobName}  className='border mt-5 rounded-lg bg-gray-500/10 h-10 pl-5 w-70 placeholder:text-slate-400 ' placeholder='Role ' required/>
             <input onChange={(e)=>isSalary(e.target.value)} value={Salary} className='border mt-5 rounded-lg bg-gray-500/10 h-10 pl-5 w-70 placeholder:text-slate-400 ' placeholder=' Salary' required/>
              <input onChange={(e)=>isAddress(e.target.value)} value={Address}  className='border mt-5 rounded-lg bg-gray-500/10 h-10 pl-5 w-70 placeholder:text-slate-400 ' placeholder='Work Location' required/>
            <textarea onChange={(e)=>isdescription(e.target.value)} value={description} className='h-20 border rounded-lg mt-5 w-70 bg-gray-500/10 pl-4 placeholder:text-slate-400' placeholder=' Description'></textarea>
            
            <button type='submit' className='bg-indigo-600 hover:bg-indigo-700 text-white text-extrabold border mt-5 rounded-lg  h-10  w-60 hover:shadow-indigo-200 ' > Publish Job</button>
          </form> 
      </div>        
        
      </div>
      ):(
      
        <div className='h-150 w-100 flex items-center justify-center flex-col rounded-lg border border-gray-500/50 shadow-2xl'>
          <AlertTriangle className='text-yellow-500 scale-500 mb-10' />
          <h3 className='text-4xl font-extrabold  mt-3 opacity-85 mt-10'>Access Denied</h3>
          <h3 className='text-sm opacity-70  mt-3 '>Only employers can post jobs</h3>
        </div>
        )}

    </div>
  )
}

export default page
