"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const BookingPage = () => {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service"); // Preselected service ID
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(preselectedService || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedService || !name || !email || !phone || !date || !time) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceId: selectedService, name, email, phone, date, time }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Booking failed. Please try again.");
        return;
      }

      setSuccess("Booking successful! We'll contact you shortly.");
      // Reset form
      setSelectedService(preselectedService || "");
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  if (loading) {
    return <p className="text-center py-16">Loading services...</p>;
  }

  if (error && !services.length) {
    return <p className="text-center text-red-500 py-16">{error}</p>;
  }

  return (
    <div className="bg-background text-primary py-16 px-6">
      <div className="container mx-auto max-w-lg bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Book a Service</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleBooking}>
          {/* Service Selection */}
          <div className="mb-4">
            <label htmlFor="service" className="block mb-2 font-semibold">
              Service
            </label>
            <select
              id="service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* Customer Details */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 font-semibold">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your phone number"
              required
            />
          </div>

          {/* Date and Time */}
          <div className="mb-4">
            <label htmlFor="date" className="block mb-2 font-semibold">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="time" className="block mb-2 font-semibold">
              Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
