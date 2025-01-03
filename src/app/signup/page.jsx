"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router=useRouter();

    async function handleSignup(e) {
        e.preventDefault();
        try {
            const user = { name, email, password };
            const res = await axios.post("/api/users/signup", user);

            if (res.data.success) {
                toast.success("User signed up successfully!");
                console.log("User:", res.data.user);
                router.push("/")
                // router.push("/"); Uncomment to navigate after signup
            } else {
                toast.error(res.data.msg || "Signup failed");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.msg || error.message || "An unknown error occurred";
            toast.error(errorMessage);
        }
    }

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-50">
            <form className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-3xl font-semibold">SignUp Page</h1>
                <input
                    type="text"
                    className="px-3 py-1 rounded bg-gray-100 text-gray-800"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    className="px-3 py-1 rounded bg-gray-100 text-gray-800"
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
                    <button className="bg-blue-500 text-white px-5 py-2 rounded" onClick={handleSignup}>
                        SignUp
                    </button>
                    <span>
                        Already an existing user? <Link href="/login" className="text-blue-500">Login</Link>
                    </span>
                </div>
            </form>
        </div>
    );
}
