import { NextResponse } from "next/server";

import { jwtVerify } from "jose";
export async function middleware(request) {
    const token=request.cookies.get("token")?.value
    if(!token){return NextResponse.redirect(new URL("/",request.url))}    
    try{
        const secrete =new TextEncoder().encode(process.env.JWT_KEY);
        const {payload}=await jwtVerify(token,secrete)
        const requestHeaders=new Headers(request.headers);
        requestHeaders.set("id",payload.id)
        requestHeaders.set("name",payload.name)
        requestHeaders.set("role",payload.role)
        return NextResponse.next({
            request :{headers:requestHeaders},}
        );

}catch(e){return NextResponse.redirect(new URL("/",request.url))}
}
export const config={
    matcher:["/dashboard/:path*","profile"]
}