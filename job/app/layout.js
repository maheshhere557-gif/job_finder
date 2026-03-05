
import { Geist, Geist_Mono } from "next/font/google";
import { HomeIcon, User,Bell } from "lucide-react";
import "./globals.css";
import Link from "next/link"



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata = {
  title: "Job Stack",
  description: "Join thousands of job seekers and connect with top companies worldwide.",
  icons:'/icon.png',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className="">
        <nav className=" relative top-0 sticky z-50  bg-black text-white items-center  w-full flex justify-between ">
        
        <div className="flex bg-black h-15 w-full justify-between border-b">
          <Link href='/' className="  flex items-center">
          <div className="flex items-center">
            
            <img src='/icon.png' className="h-15 lg:h-20"/>
            <h2 className="ml-4 scale-150 lg:scale-180 font-custom2">Job Stack</h2>
           
          </div>
           
           </Link>
          <div className="lg:w-60 flex  lg:mr-9 items-center justify-between mr-7">
           <Link href='/employer_auth'>
            <h2>
              For Employer
            </h2>
            </Link>

            <Link href='/User' className="lg:scale-160">
            <User/>
            </Link>

            <Link href='/Notification' className="lg:scale-160">
            <Bell/>
            </Link>
            
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
