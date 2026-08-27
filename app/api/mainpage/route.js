import { mongoConnect } from "@/lib/mongodb";
import Employee from "../models/employees"; 
import Employers from "../models/employers";
import { NextResponse } from "next/server";

export async function POST(request) {
    try{
        await mongoConnect()
        const body=await request.json()
        const email=body.result
        if(!email){
            return NextResponse.json({message:"Email required"})
        }
        let founduser=await Employee.findOne({supabaseEmail:email})
        return NextResponse.json({message:"success" ,data:founduser},{status:200})
    }catch(e){
        return NextResponse.json({message:"failed"},{status:400})
        
    }
    
}