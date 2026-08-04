'use client'
import {React,useState ,useEffect} from 'react'

const page = () => {
  const [jobs,setJobs]=useState([])

  useEffect(()=>{
    data()
  },[])
  const data=async()=>{
    let response=await fetch("/api/Jobs?role=admin")
    let data=await response.json()

    if(response.ok){
      setJobs(data)
    }

  }

  const approve=async(id)=>{

    let res =await fetch("/api/Jobs",{
      method:"PATCH",
      headers:{"Content-Type":"application.json"},
      body:JSON.stringify({id,newStatus:"yes"})

    })
    if(res.ok){
      setJobs(jobs.map(j=>j._id===id?{...j,status:"yes"}:j))
    }

  }
    const delet=async(id)=>{
      let res=await fetch(`/api/Jobs?id=${id}`,{
        method:"DELETE",
      })

      if(res.ok)
      {
        setJobs(jobs.filter((job)=>job._id!==id))
    }    
  

  }
  return (
   <div className='lg:mt-8 lg:ml-20 flex flex-col items-center '>
      
      <div className=' border rounded-2xl w-230 h-10  bg-yellow-500/20 2xl flex items-center justify-center shadow-sm border-black/10'>
         Lets verify the jobs posted by employers and make the platform safe for employees
      </div>
    {jobs.length> 0 ? jobs.map((job)=>(
      <div key={job._id} className='flex lg:ml-10 sm:ml-10 sm:scale-90 ' >
        <div className='bg-gray-300 scale-90 w-37 mt-10 h-32 flex items-center justify-center rounded-xl'>
          <img src='/job.webp' className='h-30 w-30 rounded-sm'/>
        </div>
        <div className='mt-10 ml-5'>
          <h3>Company Name: <span className='text-bold uppercase ml-2'>{job.Company_name}</span></h3>
          <h3>Qualification: <span className='text-bold uppercase ml-2'>{job.Qualification}</span></h3>
          <h3>Salary Offered: <span className='text-bold uppercase ml-2'>₹ {job.Salary}</span></h3>
          <h3>Address: <span className='text-bold uppercase ml-2'>{job.Address}</span></h3>

        </div>
       
        <div><button 
          onClick={()=>approve(job._id)}
        className='ml-50 mt-20 border h-10 w-30 rounded-full bg-yellow-500 cursor-pointer border-yellow-800/50 hover:scale-110  ease-in-out transition-all duration-200 hover:text-white'>{job.status =="no" ?"Approve":"Approved"}</button></div>
     

        
        <div><button
        onClick={()=>delet(job._id)}
         className='ml-50 mt-20 border h-10 w-30 rounded-full bg-red-600 cursor-pointer border-red-500/50 hover:scale-110  ease-in-out transition-all duration-200 hover:text-white'>Delete</button></div>
     
      </div>)):(
        <div className='mt-50'> No Jobs available right now</div>
      )}
      
    </div>
  )
}

export default page
