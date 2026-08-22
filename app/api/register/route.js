
import { NextResponse } from "next/server"
import mongoose from "mongoose"
import { mongoConnect } from "@/lib/mongodb"
import bcrypt from "bcryptjs"
const UserSchema=new mongoose.Schema({
       name:String,
       email:String,
       password:String,
       role:{type:String,default:"employee"}
    })

 const User=mongoose.models.User||mongoose.model("User",UserSchema)




export async function POST(request) {
    
    try{
    await mongoConnect()
    let data=await request.json()
   

    if(data.action=="register"){
    const hashedpassword=await bcrypt.hash(data.password,10)

        const finduser=await User.findOne({email:data.email})
        if(finduser){
            return NextResponse.json({message:"exist"},{status:409})
        }

            const newUser=await User.create({...data,password:hashedpassword})
            return NextResponse.json({message:"registered",user:newUser})
        
    }
    
    if(data.action=="login"){
        const finduser=await User.findOne({email:data.email})
        if(!finduser){
            return NextResponse.json({message:"notFound"},{status:404})
        }
        const ismatch=await bcrypt.compare(data.password,finduser.password)

        if(!ismatch){return NextResponse.json({message:"failed"},{status:401})}
         
      return NextResponse.json({message:"found" ,data:finduser})
    }
    return NextResponse.json({message:"Unknown error"})
    }
    catch(e){
        return NextResponse.json({message:"error",data:e})
    }


}
