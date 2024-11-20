"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2, Mail, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from  "../components/ui/alert";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verificationState, setVerificationState] = useState({
    isLoading: false,
    isVerified: false,
    isChecking: true, // New state for initial check
    error: null,
    email: ""
  });

  // Check initial verification status
  const checkVerificationStatus = async (token) => {
    try {
      const response = await axios.get(`/api/users/verifyemail?token=${token}`);
      setVerificationState(prev => ({
        ...prev,
        isChecking: false,
        isVerified: response.data.isVerified,
        email: response.data.email
      }));

      // If already verified, no need to verify again
      return response.data.isVerified;
    } catch (error) {
      setVerificationState(prev => ({
        ...prev,
        isChecking: false,
        error: "Invalid or expired verification link"
      }));
      return false;
    }
  };

  const verifyUserEmail = async () => {
    try {
      setVerificationState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await axios.post('/api/users/verifyemail', { token });
      
      setVerificationState(prev => ({
        ...prev,
        isVerified: true,
        isLoading: false,
        email: response.data.email
      }));
    } catch (error) {
      setVerificationState(prev => ({
        ...prev,
        isLoading: false,
        error: error.response?.data?.error || 'Verification failed. Please try again.'
      }));
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      checkVerificationStatus(token).then(isAlreadyVerified => {
        if (!isAlreadyVerified) {
          verifyUserEmail();
        }
      });
    } else {
      setVerificationState(prev => ({ ...prev, isChecking: false }));
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center space-y-2">
          <Mail className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900">Email Verification</h1>
          {verificationState.email && (
            <p className="text-gray-600">for {verificationState.email}</p>
          )}
        </div>

        {(verificationState.isChecking || verificationState.isLoading) && (
          <div className="flex flex-col items-center space-y-4 animate-pulse">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <p className="text-gray-600">
              {verificationState.isChecking ? "Checking verification status..." : "Verifying your email..."}
            </p>
          </div>
        )}

        {!verificationState.isChecking && verificationState.isVerified && (
          <div className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your email has been successfully verified.
              </AlertDescription>
            </Alert>
            
            <div className="text-center">
              <Link 
                href="/login"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Continue to Login
              </Link>
            </div>
          </div>
        )}

        {!verificationState.isChecking && verificationState.error && (
          <div className="space-y-4">
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <XCircle className="h-5 w-5 text-red-500" />
              <AlertTitle>Verification Failed</AlertTitle>
              <AlertDescription>
                {verificationState.error}
              </AlertDescription>
            </Alert>
            
            {verificationState.email && (
              <button
                onClick={handleResendVerification}
                disabled={verificationState.isLoading}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 w-full"
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Resend Verification Email
              </button>
            )}
            
            <div className="text-center">
              <Link 
                href="/support"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Need help? Contact support
              </Link>
            </div>
          </div>
        )}

        {!verificationState.isChecking && !token && !verificationState.isLoading && !verificationState.isVerified && !verificationState.error && (
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertTitle>Invalid Request</AlertTitle>
            <AlertDescription>
              No verification token found. Please use the link from your email.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}