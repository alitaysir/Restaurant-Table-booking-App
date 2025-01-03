"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const user = { email, password };
      const res = await axios.post("/api/users/login", user);

      if (res.data.success) {
        toast.success("Logged in successfully!");
        router.push("/");
      } else {
        toast.error(res.data.msg || "Login failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || error.message || "An unknown error occurred";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center gap-4"
      >
        <h1 className="text-3xl font-semibold">Login Page</h1>
        <input
          type="email"
          className="px-3 py-1 rounded bg-gray-100 text-gray-800 mt-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="px-3 py-1 rounded bg-gray-100 text-gray-800"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-col items-center justify-center gap-1">
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 rounded"
          >
            Login
          </button>
          <span>
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500">
              Signup
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
