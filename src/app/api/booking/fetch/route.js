export const dynamic = "force-dynamic";

import connectDB from "@/dbConfig/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";
import Booking from "@/models/bookingModel";

connectDB();

export async function GET(request){
    
    const userId =  getDataFromToken(request); // Pass the `request` object
    const user = await userModel.findById(userId);

    if (!userId || !user) {
        return NextResponse.json({ success: false, msg: "User doesn't exist" });
    }
    
      try {
        const bookings = await Booking.find({ userId })
        return NextResponse.json({ success: true, msg: "Bookings fetched successfully",bookingsData: bookings });
      } catch (error) {
        return NextResponse.json({ success: false, msg: "Error fetching Bookings" });
    }
    };


// .populate("userId", "name email");
