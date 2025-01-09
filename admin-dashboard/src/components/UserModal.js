const UserModal = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "customer",
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Send data to backend (add or update)
      const method = user ? "PUT" : "POST";
      const url = user
        ? `http://localhost:5000/api/users/${user.id}`
        : "http://localhost:5000/api/users";
  
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
            {user ? "Edit User" : "Add User"}
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
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
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
  
  export default UserModal;
  