"use client"
import { createClient } from '@/lib/utils/supabase/client'
import { useRouter } from 'next/navigation'
const page = () => {
    const supabase=createClient()
    const router=useRouter()
    const handlelogout=async()=>{
        const {error}=await supabase.auth.signOut()
        router.push("/")
    }
  return (
    <div>
      Welcome
      <button onClick={handlelogout}>Logout</button>
    </div>
  )
}

export default page
