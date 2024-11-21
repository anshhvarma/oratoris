"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(null); // Holds user data

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to logout");
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/userProfile");
            setUser(res.data.data); // Assuming `res.data.data` contains user data
            toast.success("User details fetched successfully");
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to fetch user details");
        }
    };

    useEffect(() => {
        getUserDetails(); // Fetch user details on load
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold">Profile</h1>
            <hr className="my-4 w-full border-gray-300" />

            {user ? (
                <div className="text-center">
                    <p className="text-lg font-medium">
                        Welcome, {user.username} ({user.role})
                    </p>
                    <p>Email: {user.email}</p>
                    <p>
                        Account Status:{" "}
                        <span className={`font-bold ${user.isVerified ? "text-green-600" : "text-red-600"}`}>
                            {user.isVerified ? "Verified" : "Not Verified"}
                        </span>
                    </p>
                    {user.role === "college" && (
                        <p>College Name: {user.college}</p>
                    )}
                    {user.isAdmin && <p className="text-blue-600">Admin Account</p>}

                    <h2 className="p-2 mt-4 bg-green-500 rounded">
                        <a href={`/profile/${user._id}`} className="text-white">
                            Visit Your Profile
                        </a>
                    </h2>
                </div>
            ) : (
                <p className="text-gray-600">Loading profile data...</p>
            )}

            <hr className="my-4 w-full border-gray-300" />

            <Button
                onClick={logout}
                className="text-white border rounded-lg py-2 px-4"
            >
                Logout
            </Button>
        </div>
    );
}
