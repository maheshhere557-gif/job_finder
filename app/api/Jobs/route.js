import { mongoConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const JobSchema = new mongoose.Schema(
  {
    ide:String,
    Qualification: String,
    JobName:String,
    Salary: String,
    Address: String,
    description: String,
    status:{type:String,default:"no"},
    
  },
  { collection: "job", timestamps: true },
);

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);




export async function POST(request) {
  try {
    await mongoConnect();

    let data = await request.json();
   
    if(data.fetching=="true"){
      let jobs=await Job.find({})
    
      return NextResponse.json(jobs, { status: 200 });
    }else{
    
      let newdata = await Job.create(data);
      console.log("created");
      return NextResponse.json({ message: "success" }, { status: 200 });   
  }
  } catch (e) {
    return NextResponse.json({ message: "failed" });
  }
}

export async function GET(request) {
  try{
  await mongoConnect()

  let found=await Job.find({})
  return NextResponse.json({message:"success",data:found},{status:201})
  }catch(e){
    return NextResponse.json({message:'failed'},{status:500})
  }
}


export async function DELETE(request){
  try{
    await mongoConnect()
  const {searchParams}=new URL(request.url)
  const id =searchParams.get("id")


  const delet=await Job.findByIdAndDelete(id)
  return NextResponse.json (delet,{status:200})
  }catch(e){
    NextResponse.json({message:"failed"},{status:404})
  }

}

export async function PATCH(request){

  try{
    await mongoConnect()
    
    const {id,newStatus}= await request.json()
    const update=await Job.findByIdAndUpdate(id,{status:newStatus},{new:true})
    return NextResponse.json(update,{status:200})
  } catch (e) {
    return NextResponse.json({message:"failed"},{status:404})
  }
}