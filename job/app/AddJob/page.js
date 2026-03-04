'use client'
import React, { useState } from 'react'

const page = () => {
  const [Company_name,isCompany_name]=useState('')
  const [Qualification,isQualification]=useState('')
  const [Salary,isSalary]=useState('')
  const [Address,isAddress]=useState('')

  async function Pushdata(e){
    e.preventDefault()

    let data={
      Company_name,
      Qualification,
      Salary,
      Address,
    }

    let response=await fetch("/api/Jobs",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data)

    })
    if(response.ok){
      console.log("success")
    }
  }
  return (
    <div className='h-screen items-center flex justify-center'>
      
      <div className=' mb-70 bg-gray-200 h-100 w-80 flex items-center flex-col'>
        <h3 className='text-4xl font-custom3  mt-3'>Add Job</h3>        
        <div className=' h-full  flex w-full justify-center'>
          <form  onSubmit={Pushdata} className='w-full flex flex-col items-center mt-10'>
            <input onChange={(e)=>isCompany_name(e.target.value)} value={Company_name} className='border rounded-sm h-10 text-center w-70 ' placeholder='Company Name'/>
            <input  onChange={(e)=>isQualification(e.target.value)} value={Qualification}  className='border mt-5 rounded-sm h-10 text-center w-70 ' placeholder='Qualification'/>
             <input onChange={(e)=>isSalary(e.target.value)} value={Salary} className='border rounded-sm   h-10 text-center w-70 mt-5' placeholder='Salary'/>
              <input onChange={(e)=>isAddress(e.target.value)} value={Address}  className='border rounded-sm   h-10 text-center w-70 mt-5' placeholder='Address'/>
          <button type='submit' className='border w-30 mt-10 rounded-xl h-7'> Add Job</button>
          </form> 
      </div>
      </div>
    </div>
  )
}

export default page
