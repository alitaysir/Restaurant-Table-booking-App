// Force dynamic rendering to prevent static generation
export const dynamic = "force-dynamic";

import connectDB from "@/dbConfig/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";
import Booking from "@/models/bookingModel";

// Connect to the database
connectDB();

// The GET function to fetch bookings
export async function GET(request) {
    try {
        // Get userId from token in the request
        const userId = getDataFromToken(request); // Pass the `request` object to get token
        if (!userId) {
            return NextResponse.json({ success: false, msg: "No user ID found in token" });
        }

        // Find the user in the database
        const user = await userModel.findById(userId);
        if (!user) {
            return NextResponse.json({ success: false, msg: "User doesn't exist" });
        }

        // Fetch the bookings for the user
        const bookings = await Booking.find({ userId });

        // Return the success response with booking data
        return NextResponse.json({
            success: true,
            msg: "Bookings fetched successfully",
            bookingsData: bookings,
        });
    } catch (error) {
        // Catch and log any errors during the process
        console.error(error);
        return NextResponse.json({ success: false, msg: "Error fetching Bookings" });
    }
}
