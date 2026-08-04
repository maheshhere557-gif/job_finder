'use client'
import {React,useState, useEffect}from 'react'
import {User,GraduationCap,Mail, Phone} from "lucide-react"

const page = () => {
  const [candidates,setCandidates]=useState([])
 
 useEffect(()=>{
  getdata();

 },[])
 const getdata=async()=>{
  let res=await fetch("/api/sendApplication")
  let data= await res.json()
  if(res.ok){
    setCandidates(data)
  }
  console.log(data)
 }
  return (
    <div className=" w-full h-full">
      <div >
      <h2 className="text-3xl font-bold  mt-2 ml-10 ">Candidates Applied for the Job:</h2>
        <div className="w-130 bg-black h-[1px]"></div>
      </div>

      <div className="w-full grid grid-cols-4  mt-15 gap-6"> 
      {candidates.length>0?candidates.map((candidate)=>(
         
        <div key={candidate._id} className="flex w-80 ml-5 rounded-lg  mr-10 h-60 border shadow-lg shadow-gray-900">
          <div  >
            <div className="flex mt-5 ml-20">
            <User className="size-11 border rounded-full bg-blue-100 text-blue-600"/>
          <h3 className="ml-5 mt-3 text-lg font-bold" > {candidate.name}</h3>
          </div>
          <div className="flex mt-9 ml-5">
            <GraduationCap className="size-5 mr-5"/>
          <h3>Qualification: {candidate.qualification}</h3>
          </div>

          <div className="flex ml-5 mt-5">
            <Phone className="size-5 mr-5"/>
          <h3> {candidate.phone}</h3>
          </div>
          <div className=" ml-5 flex mt-5">
            <Mail className="size-5 mr-5"/>
          <h3> {candidate.email}</h3>
          </div>
       </div>
        </div>
      )):<div>No Candidates found</div>}
      </div>
    </div>
  )
}

export default page
