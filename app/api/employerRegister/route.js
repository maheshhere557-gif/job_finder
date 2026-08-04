import { mongoConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { SignJWT } from "jose";

const employerSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{type:String,default:"employer"}
},{collection:"employers"})

const Employers=mongoose.models.employers||mongoose.model("employers",employerSchema)
export async function POST(request) {
   try{
       await mongoConnect()
       let data=await request.json()
       
    const hashedpassword=await bcrypt.hash(data.password,10)
       if(data.action=="register"){
           const finduser=await Employers.findOne({email:data.email})
           if(finduser){
               return NextResponse.json({message:"exist"})
           }
               const newUser=await Employers.create({...data,password:hashedpassword})
               return NextResponse.json({message:"registered",user:newUser})
           
       }
       if(data.action=="login"){
           const finduser=await Employers.findOne({email:data.email})
           if(!finduser){
               return NextResponse.json({message:"failed"},{status:404})
           }
           const ismatch=await bcrypt.compare(data.password,finduser.password)
           if(!ismatch){return NextResponse.json({message:"failed"},{status:401})}

           const secrete=new TextEncoder().encode(process.env.JWT_KEY)
                   const token=await new SignJWT({id:finduser.id,name:finduser.name,role:finduser.role})
                   .setProtectedHeader({alg:"HS256"})
                   .setIssuedAt()
                   .setExpirationTime("12h")
                   .sign(secrete)
                   const response=NextResponse.json({message:"success"})
           
                    response.cookies.set("token",token,{
                       httpOnly:true,
                       secure:process.env.NODE_ENV==="production",
                       sameSite:"strict",
                       maxAge:60*60*12
           
                    })
                    console.log(token)
                    return response
       }
               
       
       
       }
       catch(e){
           return NextResponse.json({message:"error",e})
       }
    
}
