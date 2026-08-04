'use client'
import {useState} from 'react'
import {useRouter} from "next/navigation"

const sendApplication = () => {
  const router = useRouter();

  const [name,setname] = useState("");
  const [qualification,setqualification] = useState("");
  const [phone,setphone] = useState("");
  const [email,setemail] = useState("");  

  let handlesubmit=async(e)=>{
    e.preventDefault();
    let res=await fetch("/api/sendApplication",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,qualification,phone,email})
      

    })

    let data=await res.json()
    if(res.ok){
      router.push("/dashboard")
    }

    
  }
    return (
        <div className='h-[92.3vh] items-center flex justify-center'>
      
      <div className=' h-150 w-100 flex items-center flex-col rounded-lg border border-gray-500/50 shadow-2xl'>
        <h3 className='text-4xl font-extrabold  mt-3 opacity-85 mt-10'>Submit Details</h3>
        <h3 className='text-sm opacity-70  mt-3 '>Fill in the details </h3>
        <div className=' h-full  flex w-full justify-center'>
          <form onSubmit={handlesubmit} className='w-full flex flex-col items-center mt-10'>
            <input
            onChange={(e)=>setname(e.target.value)}
            value={name}
             className='border outline-none placeholder:text-slate-400 rounded-lg bg-gray-500/10 h-10 pl-5 w-70 ' placeholder='  Name' required/>
            <input
            onChange={(e)=>setqualification(e.target.value)}
            value={qualification}
             className='border mt-5 rounded-lg bg-gray-500/10 h-10 pl-5 w-70 placeholder:text-slate-400 ' placeholder='Qualification' required/>
             <input
             onChange={(e)=>setphone(e.target.value)}
             value={phone}
              className='border mt-5 rounded-lg bg-gray-500/10 h-10 pl-5 w-70 placeholder:text-slate-400 ' placeholder='Phone Number' required/>
              <input
              onChange={(e)=>setemail(e.target.value)}
              value={email}
               className='border mt-5 rounded-lg bg-gray-500/10 h-10 pl-5 w-70 placeholder:text-slate-400 ' placeholder='Email Address' required/>
          <button type='submit' className='bg-indigo-600 hover:bg-indigo-700 text-white text-extrabold border mt-5 rounded-lg  h-10  w-60 hover:shadow-indigo-200 ' >Submit Application</button>
          </form> 
      </div>        
        
      </div>
    </div>

    )
}
export default sendApplication;