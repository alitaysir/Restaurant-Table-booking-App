import connectDB from "@/dbConfig/db.js";
import userModel from "@/models/userModel.js";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB(); // Ensure database is connected

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        if ( !email || !password) {
            return NextResponse.json({ success: false, msg: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return NextResponse.json({ success: false, msg: "User doesn't exists" });
        }

        // Hash password
        const iscorrect= await bcryptjs.compare(password,existingUser.password)
        if(!iscorrect){
            return NextResponse.json({ success: false, msg: "Invalid credentails" });

        }

        // Create JWT token
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

        // Prepare response with token in cookie
        const response = NextResponse.json({
            success: true,
            msg: "User logged In successfully",
            user: { id: existingUser._id, name: existingUser.name, email: existingUser.email },
        });
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ success: false, msg: "Server error" });
    }
}
