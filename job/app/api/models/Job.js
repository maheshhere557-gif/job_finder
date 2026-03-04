import mongoose from "mongoose"
const JobSchema=new mongoose.Schema({
    Company_name:String,
    Qualification:String,
    Salary:String,
    Address:String,
    
},{collection:'job',
    timestamps:true
})

export default mongoose.models.Job ||mongoose.model('Job',JobSchema)
