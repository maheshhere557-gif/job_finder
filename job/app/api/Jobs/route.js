import { mongoConnect } from "@/lib/mongodb";

import { NextResponse } from "next/server";
import Job from "../models/Job";
export async function POST(request) {
    try{
    await mongoConnect()
    console.log("connected")

    let data=await request.json()
    console.log("here is your data",data)
    
    let newdata= await Job.create(data)
    console.log("created")

    return NextResponse.json({message:"success",data:newdata})
}catch(e){
        return NextResponse.json({message:"failed"})
}
}