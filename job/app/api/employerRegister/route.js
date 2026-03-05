import { mongoConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const employerSchema=new mongoose.Schema({
    name:String,
    email:String,
    Company_name:String,
    city:String,
    password:String,
},{collection:"employers"})

const User=mongoose.models.User||mongoose.model("User",employerSchema)
export async function POST(request) {
    try{
        await mongoConnect()
        let data= await request.json()

        const newUser=await User.create(data)

        return NextResponse.json({Message:"success",newUser})
    }catch(e){
        return NextResponse.json({message:"failde ",e})
    }
    
}

export async function GET(request) {
    try{
        await mongoConnect()
        let {searchParams}=new URL(request.url)
        let email=searchParams.get('email')
        
        if(email){
            const user= await User.findOne({email})
            if(user){
                console.log("user Found")
            }
            return NextResponse.json({message:"success",data:user})
        }
        console.log(email)
        return NextResponse.json({message:"success"})

    }
    catch(e){
        return NextResponse.json({message:"failed"})
    }
}