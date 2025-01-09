const ServiceTable = ({ services, onEdit, onDelete }) => {
    return (
      <table className="w-full bg-card text-card-foreground rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-muted">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Duration</th>
            <th className="px-4 py-2 text-left">Discount</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="hover:bg-muted">
              <td className="px-4 py-2">{service.name}</td>
              <td className="px-4 py-2">{service.description}</td>
              <td className="px-4 py-2">{service.price}</td>
              <td className="px-4 py-2">{service.duration} mins</td>
              <td className="px-4 py-2">{service.discount}%</td>
              <td className="px-4 py-2 text-right space-x-2">
                <button
                  onClick={() => onEdit(service)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(service.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default ServiceTable;
  