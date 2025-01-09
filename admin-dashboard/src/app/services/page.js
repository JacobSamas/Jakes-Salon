"use client";

import React, { useEffect, useState } from "react";
import ServiceTable from "../../components/ServiceTable";
import ServiceModal from "../../components/ServiceModal";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Fetch services from the backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/services", {
          headers: {
            Authorization: `Bearer ${document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1]}`,
          },
        });
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (serviceId) => {
    try {
      const res = await fetch(`http://localhost:5001/api/services/${serviceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1]}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete service with ID ${serviceId}`);
      }

      setServices((prev) => prev.filter((service) => service.id !== serviceId));
      alert("Service deleted successfully!");
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete service.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Service Management</h1>
        <button
          onClick={() => {
            setSelectedService(null);
            setShowModal(true);
          }}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
        >
          Add Service
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ServiceTable
          services={services}
          onEdit={(service) => {
            setSelectedService(service);
            setShowModal(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {showModal && (
        <ServiceModal
          service={selectedService}
          onClose={() => setShowModal(false)}
          onSave={(newService) => {
            if (selectedService) {
              // Update existing service
              setServices((prev) =>
                prev.map((service) =>
                  service.id === newService.id ? newService : service
                )
              );
            } else {
              // Add new service
              setServices((prev) => [...prev, newService]);
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ServicesPage;
