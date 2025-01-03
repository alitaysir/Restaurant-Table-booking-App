import connectDB from "@/dbConfig/db.js";
import { NextResponse } from "next/server";
import Booking from "@/models/bookingModel";

connectDB();

export async function DELETE(request) {
    try {
      const { pathname } = new URL(request.nextUrl);
      const bookingId = pathname.split("/").pop(); // Extract bookingId from the URL
  
      if (!bookingId) {
        return NextResponse.json({ success: false, msg: "Booking Id is required" });
      }
  
      const deletedBooking = await Booking.findByIdAndDelete(bookingId);
  
      if (!deletedBooking) {
        return NextResponse.json({ success: false, msg: "Booking Not found" });
      }
  
      return NextResponse.json({ success: true, msg: "Booking Deleted successfully" });
    } catch (error) {
      console.error("Error deleting booking:", error.message); // Log the error message
      return NextResponse.json({ success: false, msg: `Error deleting booking: ${error.message}` });
    }
  }
  
