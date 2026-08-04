'use client'
import { Geist, Geist_Mono } from "next/font/google";
import { HomeIcon, User,Bell,Search } from "lucide-react";
import "./globals.css";
import Link from "next/link"
import { useEffect, useRef, useState } from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



// export const metadata = {
//   title: "Job Stack",
//   description: "Join thousands of job seekers and connect with top companies worldwide.",
//   icons:'/icon.png',
// };

export default function RootLayout({ children }) {

  const [role,setrole]=useState(null)
const [name,setName]=useState("")

 useEffect(() => {
     
       const verification =async ()=>{
         try{
           
       let res = await fetch("/api/dashboardverify", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body:JSON.stringify({action:"verify"})
     });
     let data= await res.json()
     if(data&&data.user&&data.user.role){
       setrole(data.user.role)
       setName(data.user.name)
       displayAll()
     }
   }catch(e){}
 
   }
 
   
   verification()
    
   }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      
      <body >
        <nav className="  top-0 sticky z-50  bg-black text-white items-center justify-between  w-full flex ">
        
        <div className="flex bg-black h-14 w-full justify-between border-b">
          <Link href='/' className="  flex items-center">
          <div className="flex items-center">
            
            <img src='/icon.png' className="h-13 lg:h-20"/>
            <h2 className=" lg:ml-4 scale-120 lg:scale-180 font-custom2">Job Stack</h2>
           
          </div>
           
           </Link>
          {role=="employee" &&(
           <div className="flex mt-3 relative  scale-90">
          
           </div>
           )}
          <div className="flex items-center gap-3 lg:gap-15 lg:mr-2">

                
              {!role &&(
                <Link href='/employer_auth'>
              <h2>
                For Employer
              </h2>
              </Link>)}


            <Link href='/User'>
            <User className="lg:scale-160 "/>
            </Link>


            {role=="employer" &&(
            <Link href='/Notification' className="lg:scale-160 ">
            <Bell/>
            </Link>
            )}
            
          </div>
        </div>
         
       
        </nav>
        <main >
          
          
        {children}
        </main>
      </body>
    </html>
  );
}
