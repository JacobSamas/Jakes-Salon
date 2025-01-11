"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Get the reset token from the URL

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to reset password. Please try again.");
        return;
      }

      setSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-primary">
      <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>

        {error && <p className="text-destructive mb-4 text-center">{error}</p>}
        {success && <p className="text-success mb-4 text-center">{success}</p>}

        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-semibold">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Confirm new password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/login" className="text-accent hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
