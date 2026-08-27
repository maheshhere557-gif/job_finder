import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
      supabaseEmail:String,
       supabaseID:String,
       
       role:{type:String,default:"employer"}
    },{collection:"employers"})

 const Employers=mongoose.models.Employers||mongoose.model("Employers",UserSchema)

export default Employers