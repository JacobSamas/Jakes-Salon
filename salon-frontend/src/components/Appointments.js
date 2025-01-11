"use client";

import { useState, useEffect } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      setError("");
      setLoading(true);

      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (!token) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT to get user info
        const userId = payload.id; // Assuming the token contains the user ID

        const response = await fetch(
          `http://localhost:5001/api/appointments?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointments.");
        }

        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Loading your appointments...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (appointments.length === 0) {
    return <p>You have no appointments booked yet.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>
      <ul className="space-y-4">
        {appointments.map((appointment) => (
          <li
            key={appointment.id}
            className="p-4 border rounded-lg bg-white shadow-md"
          >
            <p className="font-bold">{appointment.service}</p>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            <p>Status: {appointment.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
