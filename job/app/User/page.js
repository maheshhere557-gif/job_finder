'use client'
import React, { useEffect } from 'react'
import {User} from "lucide-react"
import Link from "next/link"
const page = () => {
  useEffect(()=>{
    import ("@google/model-viewer")
  })
  return (
    <div className='lg:w-full justify-center mt-30 h-screen w-full'>
        <div className='w-100'>
            <User className='w-full' />
        </div>
        <div className='text-xl mt-10 ml-40'> <Link href="/AddJob">
        Insert Job
        </Link></div>

        
    </div>
  )
}

export default page
