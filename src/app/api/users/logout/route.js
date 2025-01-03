import { NextResponse } from "next/server";

export async function GET(request){
    try {
        const response=NextResponse.json({
            success:true,
            message:"Logout successfull"
        })
        response.cookies.set("token", "", {
            httpOnly: true,
        });
        return response;
        
    } catch (error) {
        return NextResponse.json({success:false,error:error.message})
    }
}