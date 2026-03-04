import Image from "next/image";
import  Link from "next/link"
export default function Home() {
  return (
    <div className=" h-screen b-0 flex top-0">
      
      <img src="Homebg.jpeg" className="object-cover object-contain -z-10"/>
     
        
     
      <h1 className=" font-custom3 text  text-white mt-40 ml-5  absolute text-2xl">Match your skills,</h1>
      <h1 className="font-custom3 absolute mt-50 ml-20  text-white text-2xl ">Meet Your Future</h1>
      <h1 className="font-custom2 absolute ml-5 text-white mt-70 ">Lets Get You Signed In</h1>
      <Link href='/Auth' className="absolute">
        <button className="text-white mt-90 ml-40 border w-30 h-11 border-yellow-500 border-xl border-2 ">Sign In</button>
      </Link>
      <main className="">
        
      </main>
    </div>
  );
}
