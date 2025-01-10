"use client";

import React, { useState, useEffect } from "react";
import AppointmentTable from "../../components/AppointmentTable";
import AppointmentModal from "../../components/AppointmentModal";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Fetch appointments from the backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/appointments", {
          headers: {
            Authorization: `Bearer ${document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1]}`,
          },
        });
        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (appointmentId) => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/appointments/${appointmentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1]}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to delete appointment with ID ${appointmentId}`);
      }

      setAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== appointmentId)
      );
      alert("Appointment deleted successfully!");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointment Management</h1>
        <button
          onClick={() => {
            setSelectedAppointment(null); // Clear for new entry
            setShowModal(true); // Open modal
          }}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
        >
          Add Appointment
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <AppointmentTable
          appointments={appointments}
          onEdit={(appointment) => {
            setSelectedAppointment(appointment);
            setShowModal(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {showModal && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => setShowModal(false)}
          onSave={(newAppointment) => {
            if (selectedAppointment) {
              // Update existing appointment
              setAppointments((prev) =>
                prev.map((appointment) =>
                  appointment.id === newAppointment.id
                    ? newAppointment
                    : appointment
                )
              );
            } else {
              // Add new appointment
              setAppointments((prev) => [...prev, newAppointment]);
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AppointmentsPage;
