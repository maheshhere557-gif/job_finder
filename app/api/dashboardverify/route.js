import { NextResponse } from "next/server";
import { jwtVerify } from "jose";


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
    
    else if(data.action=="verify"){
    const token=request.cookies.get("token")?.value
    if(!token){return NextResponse.json({isauthenticated:false},{status:401})}

    try{
        const secret=new TextEncoder().encode(process.env.JWT_KEY)
        const {payload}=await jwtVerify(token,secret)
        return NextResponse.json({
            isauthenticated:true,
            user:{
                id:payload.id,
                role:payload.role,
                name:payload.name
            }
        },{status:201})
    }catch(e){return NextResponse.json({isauthenticated:false},{status:401})}

   
}

}
