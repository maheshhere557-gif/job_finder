'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
const page = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [Company_name,setCompany_name]=useState('')
    const [city,setCity]=useState('')
     const [password,setPassword]=useState('')
    const router=useRouter()
    let data={name,email,Company_name,city,password}
    
    const Datasubmit= async (e)=>{
        e.preventDefault()
        let response=await fetch('/api/employerRegister',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        })
        if(response.ok){
            console.log("sent check in mongoDb")
        }
        // router.push('/AddJob')
    }
  return (
    <div className='bg-black w-full h-screen flex items-center justify-center'>
        <div className='h-150 w-250 bg-white rounded-lg flex'>
            <div className='w-[50%]'>texts</div>
            <div className='flex flex-col text-center w-[50%] scale-110'>
                <h2 className='mt-15 scale-200 font-custom3'>Register</h2>
               
                <div>
                <form onSubmit={Datasubmit} className='flex flex-col items-center'>
                <input 
                name="name"
                type="text"
                value={name} 
                onChange={(e)=>setName(e.target.value)}
                placeholder="Username"
                className='border w-60 rounded-md pl-5 mt-20'/>

                <input 
                name="email"
                type="email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Work Email"
                className='border w-60 rounded-md pl-5 mt-5'/>
      
                <input 
                name="password"
                type="password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
                className='border w-60 rounded-md pl-5 mt-5'/>
      

                <input 
                name="name"
                type="text" 
                value={Company_name}
                onChange={(e)=>setCompany_name(e.target.value)}
                placeholder="Company name"
                className='border w-60 rounded-md pl-5 mt-5'/>

                <input 
                name="name"
                type="text" 
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                placeholder="City"
                className='border w-60 rounded-md pl-5 mt-5'/>
            
                <button type='submit' className='border w-30 mt-5 rounded'>Submit</button>
                </form>
                
                </div>
                </div>
        </div>
      
    </div>
  )
}

export default page
