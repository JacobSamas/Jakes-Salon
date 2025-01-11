"use client";

import ProfileTabs from "../../components/ProfileTabs";

const ProfilePage = () => {
  return (
    <div className="bg-background text-primary py-16 px-6">
      <div className="container mx-auto max-w-4xl bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Your Profile</h1>
        <ProfileTabs />
      </div>
    </div>
  );
};

export default ProfilePage;
