import mongoose from "mongoose";
import { mongoConnect } from "@/lib/mongodb"
import {NextResponse}from "next/server"
const Schema=new mongoose.Schema({
    name:String,
    qualification:String,
    phone:String,
    email:String
},{collection:"applications"})
const applications=mongoose.models.applications|| mongoose.model("applications",Schema)
export async function POST(request){
try{
    await mongoConnect()

    let data=await request.json()

    let datainsert=await applications.create(data)
    console.log(data)
    return NextResponse.json({message:"success"},{status:200})

}catch(e){
return NextResponse.json({message:"error",e},{status:500})
}

}


export async function GET(){
    try{
        await mongoConnect()
        let data=await applications.find({})
        return NextResponse.json(data,{status:200})
    }
    catch(e){
        return NextResponse.json({message:"error",e},{status:500})
    }
}