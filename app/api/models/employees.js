import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
      supabaseEmail:String,
       supabaseID:String,
       
       role:{type:String,default:"employee"}
    },{collection:"users"})

 const Employee=mongoose.models.Employee||mongoose.model("Employee",UserSchema)
export default Employee
