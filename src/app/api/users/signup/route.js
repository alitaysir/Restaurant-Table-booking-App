import connectDB from "@/dbConfig/db.js";
import userModel from "@/models/userModel.js";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB(); // Ensure database is connected

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { name, email, password } = reqBody;

        if (!name || !email || !password) {
            return NextResponse.json({ success: false, msg: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ success: false, msg: "User already exists" });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        // Create JWT token
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

        // Prepare response with token in cookie
        const response = NextResponse.json({
            success: true,
            msg: "User created successfully",
            user: { id: savedUser._id, name: savedUser.name, email: savedUser.email },
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
