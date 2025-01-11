"use client";

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center transition hover:shadow-xl">
      {/* Placeholder for Image */}
      <div className="mb-4 h-32 w-32 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
        <span className="text-gray-500 font-bold text-lg">Image</span>
      </div>

      <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <p className="text-lg font-semibold text-primary mb-4">
        ${service.price}
      </p>
      <a
        href={`/booking?service=${service.id}`}
        className="inline-block bg-primary text-white px-4 py-2 rounded-full hover:bg-secondary transition"
      >
        Book Now
      </a>
    </div>
  );
};

export default ServiceCard;
