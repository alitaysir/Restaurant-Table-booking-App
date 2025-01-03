import connectDB from "@/dbConfig/db";
import Booking from "@/models/bookingModel";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {
  try {
    const { restaurantId, date } = await request.json(); // Extract from request body

    if (!restaurantId || !date) {
      return NextResponse.json({ success:false, msg: "Restaurant ID and date are required" });
    }

    const bookings = await Booking.find({ restaurantId, date });
    const bookedSlots = bookings.map((b) => b.timeSlot);

    // Generate all time slots
    // const allSlots = Array.from({ length: 10 }, (_, i) => `${i + 1}:00 PM`);
    // const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

    return NextResponse.json({ success:true, slots:bookedSlots });

    // return NextResponse.json({ availableSlots });
  } catch (error) {
    console.error("Error fetching available slots:", error);
      return NextResponse.json({ success:false, msg: "Error fetching available slots" });
  }
}
