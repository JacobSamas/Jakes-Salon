"use client";

import React, { useEffect, useState } from "react";
import Card from "../../components/Card";

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    users: 0,
    services: 0,
    appointments: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/dashboard-metrics", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1]}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch metrics");

        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Total Users" value={metrics.users} />
      <Card title="Total Services" value={metrics.services} />
      <Card title="Total Appointments" value={metrics.appointments} />
    </div>
  );
};

export default Dashboard;
