import connectDB from "@/dbConfig/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";

connectDB();

export async function GET(request) {
    try {
        const userId = getDataFromToken(request); // Pass the `request` object
        const user = await userModel.findById(userId); // Pass `userId` directly
        if (user) {
            return NextResponse.json({ success: true, info: user });
        } else {
            return NextResponse.json({ success: false, msg: "User not found" });
        }
    } catch (error) {
        console.error("Error in GET route:", error.message);
        return NextResponse.json({ success: false, msg: "Error retrieving user" });
    }
}
