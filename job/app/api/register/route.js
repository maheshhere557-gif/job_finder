
import { NextResponse } from "next/server"
import mongoose from "mongoose"
import { mongoConnect } from "@/lib/mongodb"



const UserSchema=new mongoose.Schema({
       name:String,
       email:String,
       password:String,
    })

 const User=mongoose.models.User||mongoose.model("User",UserSchema)

 //pushing(sending)
export async function POST(request) {
    
    try{
    let data=await request.json()
    await mongoConnect()

   
    const newUser=await User.create(data)
    return NextResponse.json({message:"success",})
    }
    catch(e){
        return NextResponse.json({message:"failed",e})
    }
}


export  async function GET(request) {
    try {
        await mongoConnect()
        const {searchParams}=new URL(request.url)
        const email=searchParams.get("email")

        if(email){
            const user=await User.findOne({email:email})
            return NextResponse.json({
                message:"success",
                data:user
            })
        }
    return NextResponse.json({ message: "No email provided" }, { status: 400 })
    }
    catch(e){
        console.log(e)
        return NextResponse.json({ message: "error", error: e.message }, { status: 500 })
    }
}
