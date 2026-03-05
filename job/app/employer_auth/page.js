'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
const page = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [Company_name,setCompany_name]=useState('')
    const [city,setCity]=useState('')
    const [password,setPassword]=useState('')
    const [signup,setSignup]=useState(true)
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
            setSignup(false)
            setEmail("")
            setPassword("")
        }
        // router.push('/AddJob')


    }
    const Data_retrieve=async (e)=>{
        e.preventDefault()
        let res=await fetch(`/api/employerRegister?email=${email}`)
        let resuldata=await res.json()

        if(resuldata.message==="success" && resuldata.data){
            if(resuldata.data.password===password){
                router.push('/dashboard')
            }
        }
        else{
            console.log("user not found")
        }
    }
  return (
    <div className='bg-black w-full h-[93.5vh] lg:h-[91.8vh] flex items-center justify-center overflow-hidden' >
     {signup?(
     <div className='bg-white w-80  h-[500px] lg:h-[500px] justify-center items-center lg:w-300 rounded-lg flex mb-10' >
        <div className='hidden lg:w-150  lg:flex '>text</div>
        <div className='flex flex-col justify-center items-center '>
            <h3 className='scale-180 font-custom2  animate-bounce '>Register</h3>
            <form onSubmit={Datasubmit} className=' flex flex-col items-center'>
                <input 
                name="name"
                type="text"
                value={name} 
                onChange={(e)=>setName(e.target.value)}
                placeholder="Username"
                className='border lg:w-60 rounded-md pl-5 mt-15'/>

                <input 
                name="email"
                type="email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Work Email"
                className='border lg:w-60 rounded-md pl-5 mt-5'/>
      
                <input 
                name="password"
                type="password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
                className='border lg:w-60 rounded-md pl-5 mt-5'/>
      

                <input 
                name="name"
                type="text" 
                value={Company_name}
                onChange={(e)=>setCompany_name(e.target.value)}
                placeholder="Company name"
                className='border lg:w-60 rounded-md pl-5 mt-5'/>

                <input 
                name="name"
                type="text" 
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                placeholder="City"
                className='border lg:w-60 rounded-md pl-5 mt-5'/>
            
                <button type='submit' className='border w-30 mt-5 rounded hover:bg-gray-200'>Submit</button>
                <h3 onClick={()=>setSignup(false)} className='text-black'>Already Have an account </h3>

                </form></div>


     </div>
    ):(
        <div className='bg-white w-80 h-[500px] lg:h-[500px] justify-center items-center lg:w-300 rounded-lg flex mb-10' >
        <div className='hidden lg:w-150  lg:flex '>text</div>
        <div className='flex flex-col justify-center items-center '>
            <h3 className='scale-180 font-custom2' >Login </h3>
            <form onSubmit={Data_retrieve} className=' flex flex-col items-center'>
                

                <input 
                name="email"
                type="email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Work Email"
                className='border lg:w-60 rounded-md pl-5 mt-5'/>
      
                <input 
                name="password"
                type="password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
                className='border lg:w-60 rounded-md pl-5 mt-5'/>
      

                
            
                <button type='submit' className='border w-30 mt-5 rounded hover:bg-gray-200'>Submit</button>
                <h3 onClick={()=>setSignup(true)} className='text-black mt-2'>Already Have an account </h3>

                </form></div>


     </div>
    )}
      


    </div>
  )
}

export default page
