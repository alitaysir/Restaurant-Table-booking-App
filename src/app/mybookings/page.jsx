"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaCheckCircle, FaUserFriends } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function BookingsPage() {
  const [bookingdata, setBookingData] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get("/api/booking/fetch");
      if (response.data.success) {
        setBookingData(response.data.bookingsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function deleteBooking(id) {
    try {
      const response = await axios.delete(`/api/booking/delete/${id}`);
      if (response.data.success) {
        toast.success("Booking deleted");
        setBookingData((prev) =>
          prev.filter((booking) => booking._id !== id)
        );
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error("Error during delete:", error);
      toast.error("Error deleting booking");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Your Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookingdata.length > 0 ? (
          bookingdata.map((booking) => (
            <div
              key={booking._id}
              className="bg-gray-50 shadow-md rounded-lg p-4 relative flex flex-col space-y-4"
            >
              <div className="text-center">
                <FaMapMarkerAlt className="inline text-red-500 mr-2" />
                <span className="text-lg font-semibold">
                  {booking.restaurantName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-sm text-gray-600">{booking.date}</span>
                </div>
                <div className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-md">
                  {booking.timeSlot}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaUserFriends className="text-gray-500" />
                <span className="text-sm text-gray-600">
                  {booking.guests} guests
                </span>
              </div>
              <button
                onClick={() => deleteBooking(booking._id)}
                className="absolute bottom-4 right-4 text-red-500 hover:text-red-700"
              >
                <MdDelete size={20} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No bookings found.
          </p>
        )}
      </div>
    </div>
  );
}
