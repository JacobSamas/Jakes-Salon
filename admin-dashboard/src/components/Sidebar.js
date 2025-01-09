"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import {
  FiHome,
  FiUsers,
  FiScissors,
  FiCalendar,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = () => {
  const [active, setActive] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null); 
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      router.push("/login"); 
    }
  }, [router]);

  const handleActive = (path) => {
    setActive(path);
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Users", path: "/users", icon: <FiUsers /> },
    { name: "Services", path: "/services", icon: <FiScissors /> },
    { name: "Appointments", path: "/appointments", icon: <FiCalendar /> },
  ];

  if (isLoggedIn === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-muted">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <aside className="w-64 bg-card text-card-foreground h-screen shadow-lg">
      <div className="p-6 text-center border-b border-muted">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="flex flex-col mt-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            onClick={() => setActive(item.path)} 
            className={`flex items-center px-4 py-3 text-lg hover:bg-muted rounded-lg transition ${
              active === item.path ? "bg-primary text-primary-foreground" : ""
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-6">
        <button
          onClick={() => {
            document.cookie =
              "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            router.push("/login");
          }}
          className="flex items-center w-full px-4 py-3 text-lg text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-lg transition"
        >
          <FiLogOut className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
