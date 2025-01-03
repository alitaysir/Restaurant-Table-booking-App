import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurantId: { type: Number, required: true },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    guests: { type: Number, required: true },
    restaurantName: { type: String, required: true },
  });
  
  const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

  export default Booking