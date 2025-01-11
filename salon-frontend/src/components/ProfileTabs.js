"use client";

import { useState } from "react";
import ProfileDetails from "./ProfileDetails";
import Appointments from "./Appointments";
import Settings from "./Settings";

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileDetails />;
      case "appointments":
        return <Appointments />;
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button
          className={`flex-1 p-4 text-center ${
            activeTab === "profile"
              ? "border-b-4 border-primary font-bold"
              : "hover:bg-muted"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`flex-1 p-4 text-center ${
            activeTab === "appointments"
              ? "border-b-4 border-primary font-bold"
              : "hover:bg-muted"
          }`}
          onClick={() => setActiveTab("appointments")}
        >
          Appointments
        </button>
        <button
          className={`flex-1 p-4 text-center ${
            activeTab === "settings"
              ? "border-b-4 border-primary font-bold"
              : "hover:bg-muted"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      {/* Tab Content */}
      <div>{renderContent()}</div>
    </div>
  );
};

export default ProfileTabs;
