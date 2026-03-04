import mongoose from "mongoose";

export async function mongoConnect(){

    let MONGO_URL=process.env.MONGO_URL

    if(!MONGO_URL){
        console.log(" Mongo url not added")
        return
    }

    if(mongoose.connections[0].readyState==1){
            console.log("Connected")
        return
    }

   try{
        let c=await mongoose.connect(MONGO_URL,{
            dbName:"job_viewers"
        })
        if(c.connections[0].readyState==1){
            console.log("connected to mongodb")
        }
        
        
    }
    catch(e){
        console.log(e)
    }
   
}