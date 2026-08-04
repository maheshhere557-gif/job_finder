import { mongoConnect } from "@/lib/mongodb"
import mongoose from "mongoose"
import { NextResponse } from "next/server"
let Schema=new mongoose.Schema({
    email:String,
    password:String,
},{collection:"admin_only"})

let AdminUser=mongoose.models.admin_only||mongoose.model("admin_only",Schema)
export async function POST(request) {
    await mongoConnect()

    let data=await request.json()
    console.log("data recieved from frontend",data)
     try{
        let  logadmin=await AdminUser.findOne({email:data.email})

        if(logadmin.password !==data.password)
            return NextResponse.json({message:'incorrectpass'})
        
        if(logadmin){
        return NextResponse.json({message:"success"},{status:200})
        }else{
            return NextResponse.json({message:"not found"},{status:401})
        }
    }catch(e){
        return NextResponse.json({message:"Something went wrong"})
    }


    
}