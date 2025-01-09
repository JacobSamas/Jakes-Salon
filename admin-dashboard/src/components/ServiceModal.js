import { useState } from 'react';

const ServiceModal = ({ service, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      name: service?.name || "",
      description: service?.description || "",
      price: service?.price || 0,
      duration: service?.duration || 30,
      discount: service?.discount || 0,
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Send data to backend (add or update)
      const method = service ? "PUT" : "POST";
      const url = service
        ? `http://localhost:5001/api/services/${service.id}`
        : "http://localhost:5001/api/services";
  
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
            {service ? "Edit Service" : "Add Service"}
          </h2>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) })
            }
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Duration (mins)"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: parseInt(e.target.value) })
            }
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Discount (%)"
            value={formData.discount}
            onChange={(e) =>
              setFormData({ ...formData, discount: parseInt(e.target.value) })
            }
            className="w-full p-2 mb-4 border rounded"
          />
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
  
  export default ServiceModal;
  