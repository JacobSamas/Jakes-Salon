"use client";

import { useState } from "react";

const Settings = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+123 456 7890");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage("Profile updated successfully!");
    // API integration for updating profile information can be added here
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    setMessage("Password changed successfully!");
    // API integration for changing password can be added here
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirm) {
      setMessage("Account deleted successfully!");
      // API integration for deleting account can be added here
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>

      {message && <p className="text-green-500 mb-4">{message}</p>}

      {/* Update Profile Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Update Profile</h3>
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block font-semibold mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition"
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Change Password</h3>
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block font-semibold mb-1">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block font-semibold mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-semibold mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition"
          >
            Change Password
          </button>
        </form>
      </div>

      {/* Delete Account Section */}
      <div>
        <h3 className="text-xl font-bold mb-2">Delete Account</h3>
        <p className="text-red-500 mb-4">
          Warning: This action is irreversible. Proceed with caution.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="bg-destructive text-white px-6 py-2 rounded-lg hover:bg-secondary transition"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
