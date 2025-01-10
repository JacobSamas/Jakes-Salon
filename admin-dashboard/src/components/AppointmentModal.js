import { useState } from "react";

const AppointmentModal = ({ appointment, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    clientName: appointment?.clientName || "",
    serviceName: appointment?.serviceName || "",
    date: appointment?.date || "",
    time: appointment?.time || "",
    status: appointment?.status || "Pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = appointment ? "PUT" : "POST";
    const url = appointment
      ? `http://localhost:5001/api/appointments/${appointment.id}`
      : "http://localhost:5001/api/appointments";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1]}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-card text-card-foreground p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-xl font-bold mb-4">
          {appointment ? "Edit Appointment" : "Add Appointment"}
        </h2>
        <input
          type="text"
          placeholder="Client Name"
          value={formData.clientName}
          onChange={(e) =>
            setFormData({ ...formData, clientName: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Service Name"
          value={formData.serviceName}
          onChange={(e) =>
            setFormData({ ...formData, serviceName: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
        </select>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-muted text-muted-foreground rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentModal;
