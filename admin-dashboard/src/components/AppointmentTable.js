const AppointmentTable = ({ appointments, onEdit, onDelete }) => {
    return (
      <table className="w-full bg-card text-card-foreground rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-muted">
            <th className="px-4 py-2 text-left">Client Name</th>
            <th className="px-4 py-2 text-left">Service</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Time</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="hover:bg-muted">
              <td className="px-4 py-2">{appointment.clientName}</td>
              <td className="px-4 py-2">{appointment.serviceName}</td>
              <td className="px-4 py-2">{appointment.date}</td>
              <td className="px-4 py-2">{appointment.time}</td>
              <td className="px-4 py-2">{appointment.status}</td>
              <td className="px-4 py-2 text-right space-x-2">
                <button
                  onClick={() => onEdit(appointment)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(appointment.id)}
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
  
  export default AppointmentTable;
  