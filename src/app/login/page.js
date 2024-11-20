"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
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
    }
  };

  const onLogin = async () => {
    try {
      // Validate all fields before submission
      const emailError = validateEmail(user.email);
      const passwordError = validatePassword(user.password);

      if (emailError || passwordError) {
        setErrors({
          email: emailError,
          password: passwordError
        });
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      
      toast.success("Login successful!");
      router.push("/"); // Or wherever you want to redirect after login
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Enable button only if there are no errors and all required fields are filled
    const hasErrors = Object.values(errors).some(error => error !== "");
    const allFieldsFilled = user.email && user.password;
    setButtonDisabled(hasErrors || !allFieldsFilled || loading);
  }, [user, errors, loading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {loading ? "Signing In..." : "Welcome Back"}
        </h1>
        
        <div className="space-y-4">
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
              placeholder="Enter your email"
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
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            onClick={onLogin}
            disabled={buttonDisabled}
            className={`w-full p-2 rounded-lg transition-colors ${
              buttonDisabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="flex flex-col space-y-2 text-center text-sm">
            <Link 
              href="/" 
              className="text-blue-500 hover:text-blue-600"
            >
              Forgot your password?
            </Link>
            
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <Link 
                href="/signup" 
                className="text-blue-500 hover:text-blue-600"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}