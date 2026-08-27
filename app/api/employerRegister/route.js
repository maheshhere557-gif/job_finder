
import { NextResponse } from "next/server"
import mongoose from "mongoose"
import { mongoConnect } from "@/lib/mongodb"
const UserSchema=new mongoose.Schema({
      supabaseEmail:String,
       supabaseID:String,
       
       role:{type:String,default:"employer"}
    },{collection:"employers"})

 const User=mongoose.models.User||mongoose.model("User",UserSchema)




export async function POST(request) {
    
    try{
    await mongoConnect()
    let body=await request.json()
    const {supabaseEmail,supabaseID}=body;
    const newUser=await User.create({supabaseEmail,supabaseID})
    return NextResponse.json({message:"registered",user:newUser})
        
    
    
   
    }
    catch(e){
        return NextResponse.json({message:"error",data:e})
    }


}
