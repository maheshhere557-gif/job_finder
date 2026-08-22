import { NextResponse } from "next/server";


export async function POST(request) {
    let data=await request.json()

    if(data.action=="logout"){
        try{
        const response= NextResponse.json({message:"success"},{status:201})
            
        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0),
            path:"/"
        })
        return response
        }catch(e){
            return NextResponse.json({message:"failed"},{status:401})
        }

    }
    
    return NextResponse.json({isauthenticated:false},{status:401})

}
