import "./globals.css";
import React from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Jake's Salon Admin Panel",
  description: "Admin panel for Jake's Salon",
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
    </body>
    </html>
  );
};

export default Layout;
