import connectDB from "@/dbConfig/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";
import Booking from "@/models/bookingModel";

connectDB();

export async function POST(request) {
    try {
        const userId =  getDataFromToken(request); // Pass the `request` object
        const reqBody = await request.json();
        const { date, timeSlot, guests, name, contact, restaurantId,restaurantName } = reqBody;
        const user = await userModel.findById(userId);
        if (!user) {
            return NextResponse.json({ success: false, msg: "User doesn't exist" });
        }
    
        // Check if time slot is already booked
        const existingBooking = await Booking.findOne({ restaurantId, date, timeSlot });
        if (existingBooking) {
            return NextResponse.json({ success: false, msg: "Time Slot is already booked" });
        }
    
        // Create a new booking
        const newBooking = new Booking({
          userId,
          restaurantId,
          date,
          timeSlot,
          name,
          contact,
          guests,
          restaurantName
        });
    
        await newBooking.save();
        return NextResponse.json({ success: true, msg: "Booking successfull" });
    

    } catch (error) {
        return NextResponse.json({ success: false, msg: "Booking Error" });

    }
}
