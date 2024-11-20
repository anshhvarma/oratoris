"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import collegesData from './college.json'

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    role: "student",
    college: ""
  });
  
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
    college: ""
  });
  
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const validateUsername = (username) => {
    if (!username) return "Username is required";
    if (username.length < 3) return "Username must be at least 3 characters";
    return "";
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));

    // Update errors
    if (name === "email") {
      setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    } else if (name === "password") {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }));
    } else if (name === "username") {
      setErrors(prev => ({ ...prev, username: validateUsername(value) }));
    }
  };

  const onSignup = async () => {
    try {
      // Validate all fields before submission
      const emailError = validateEmail(user.email);
      const passwordError = validatePassword(user.password);
      const usernameError = validateUsername(user.username);

      if (emailError || passwordError || usernameError) {
        setErrors({
          email: emailError,
          password: passwordError,
          username: usernameError
        });
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Signup failed";
      toast.error(errorMessage);
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Enable button only if there are no errors and all required fields are filled
    const hasErrors = Object.values(errors).some(error => error !== "");
    const allFieldsFilled = user.email && user.password && user.username && user.role;
    setButtonDisabled(hasErrors || !allFieldsFilled || loading);
  }, [user, errors, loading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {loading ? "Processing..." : "Create Account"}
        </h1>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              className={`mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              id="username"
              name="username"
              type="text"
              value={user.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className={`mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              className={`mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              id="password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              id="role"
              name="role"
              value={user.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="speaker">Speaker</option>
              <option value="college">College</option>
            </select>
          </div>

          {user.role === "college" && (
            <div>
              <label htmlFor="college" className="block text-sm font-medium text-gray-700">
                Select College
              </label>
              <select
                className={`mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.college ? "border-red-500" : "border-gray-300"
                }`}
                id="college"
                name="college"
                value={user.college}
                onChange={handleChange}
              >
                <option value="">Choose a college</option>
                {collegesData.map(college => (
                  <option key={college.id} value={college.name}>
                    {college.name}
                  </option>
                ))}
              </select>
              {errors.college && (
                <p className="mt-1 text-sm text-red-500">{errors.college}</p>
              )}
            </div>
          )}

          <button
            onClick={onSignup}
            disabled={buttonDisabled}
            className={`w-full p-2 rounded-lg transition-colors ${
              buttonDisabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:text-blue-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


