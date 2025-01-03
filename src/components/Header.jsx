"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Header = () => {
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await axios.get("/api/users/logout");
      if (response.data.success) {
        toast.success("Logged out successfully");
        router.push("/login");
      } else {
        toast.error("Error while logging out");
      }
    } catch (error) {
      toast.error("Error while logging out");
    }
  }

  function handleMyBookings() {
    router.push("/mybookings");
  }

  return (
    <div className="p-5 md:px-12 lg:px-28">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Booking-App</h1>
        <div className="flex items-center justify-center gap-8">
          <button
            className="flex items-center gap-2 font-medium py-0.5 px-2 sm:py-1 sm:px-4 border border-solid border-black shadow-[-7px_-7px_0px_#000000]"
            onClick={handleMyBookings}
          >
            My Bookings
          </button>
          <button
            className="flex items-center gap-2 font-medium py-0.5 px-2 sm:py-1 sm:px-4 border border-solid border-black shadow-[-7px_-7px_0px_#000000]"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Restaurants</h1>
        <p className="mt-7 max-w-[740px] m-auto text-xs sm:text-base">
          Effortlessly reserve your table at top-rated restaurants. Browse menus, view photos, and secure your spot with just a few clicks. Find the perfect dining experience awaits.
        </p>
      </div>
    </div>
  );
};

export default Header;
