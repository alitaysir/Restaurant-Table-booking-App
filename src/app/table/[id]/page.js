"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { blog_data } from "@/Assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const BookingPage = ({ params }) => {
  const router = useRouter();
  const cid = parseInt(params.id, 10); // Ensure `cid` is a number
  const restaurant = blog_data.find((item) => item.id === cid) || {
    title: "Restaurant Not Found",
    description: "We couldn't find the restaurant you're looking for.",
    image: "",
    category: "N/A",
  };
  const [bookedslots, setbookedslots] = useState([]);
  const timeSlots = Array.from({ length: 10 }, (_, i) => `${i + 1}:00 PM`);

  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    timeSlot: "",
    guests: 1,
    name: "",
    contact: "",
    restaurantId: cid,
    restaurantName: restaurant.title,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimeSlotChange = (slot) => {
    setBookingDetails((prev) => ({
      ...prev,
      timeSlot: slot,
    }));
  };

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.post("/api/booking/available-slots", {
        restaurantId: cid,
        date: bookingDetails.date,
      });
      if (response.data.success) {
        setbookedslots(response.data.slots);
      } else {
        toast.error("Error fetching booked time slots");
      }
    } catch (error) {
      console.error("Error fetching booked slots:", error);
      toast.error("Error fetching booked slots");
    }
  };

  useEffect(() => {
    if (bookingDetails.date) {
      fetchAvailableSlots();
    }
  }, [bookingDetails.date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/booking/create", bookingDetails);
      if (res.data.success) {
        toast.success("Booking successful");
        router.push("/mybookings");
      } else {
        toast.error(res.data.msg || "Error Booking a Table");
      }
    } catch (error) {
      console.error("Error during booking:", error);
      toast.error("Error Booking a Table");
    }
  };

  const getDateRange = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);

    return {
      min: tomorrow.toISOString().split("T")[0],
      max: maxDate.toISOString().split("T")[0],
    };
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md overflow-hidden">
        {restaurant.image && (
          <Image
            src={restaurant.image || "/path/to/default-image.jpg"}
            alt={restaurant.title}
            className="w-full h-70 object-cover"
            width={500}
            height={300}
          />
        )}
        <div className="p-6">
          <div className="flex items-center justify-between pr-5">
            <h1 className="text-3xl font-bold text-gray-800">{restaurant.title}</h1>
            <span className="inline-block mt-3 px-4 py-2 bg-blue-100 rounded-full text-sm text-gray-700">
              {restaurant.category}
            </span>
          </div>
          <p className="text-gray-600 mt-2">{restaurant.description}</p>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-yellow-50"
              min={getDateRange().min}
              max={getDateRange().max}
              value={bookingDetails.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="timeSlot">
              Time Slot Available
            </label>
            <div className="grid grid-cols-5 gap-2">
              {timeSlots.map((slot) => (
                bookedslots.includes(slot) ? (
                  <button
                    disabled
                    className="px-4 py-2 rounded-lg border bg-gray-100 text-gray-400"
                  >
                    {slot} 
                  </button>
                ) : (
                  <button
                    key={slot}
                    type="button"
                    className={`px-4 py-2 rounded-lg border ${
                      bookingDetails.timeSlot === slot
                        ? "bg-blue-500 text-white"
                        : "bg-blue-100 text-gray-700"
                    } hover:bg-blue-500 hover:text-white`}
                    onClick={() => handleTimeSlotChange(slot)}
                  >
                    {slot}
                  </button>
                )
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="guests">
              Number of Guests
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-yellow-50"
              min="1"
              value={bookingDetails.guests}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-yellow-50"
              value={bookingDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="contact">
              Contact Details
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-yellow-50"
              value={bookingDetails.contact}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-200 text-gray-600 py-2 px-5 rounded-lg hover:bg-blue-500 hover:text-white"
            >
              Confirm Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
