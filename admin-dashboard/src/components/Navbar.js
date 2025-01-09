import React from "react";
import { FiBell, FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between bg-card text-card-foreground px-6 py-4 shadow-md">
      {/* Left Section: Logo or Title */}
      <div className="text-xl font-bold">Welcome, Admin</div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-muted focus:outline-none"
        >
          <FiBell className="w-6 h-6" />
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted focus:outline-none"
          >
            <FiUser className="w-6 h-6" />
            <span>Profile</span>
          </button>
          {/* Dropdown menu can be added here in future */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
