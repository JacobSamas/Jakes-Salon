"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const ContactCTASection = () => {
  return (
    <section className="bg-primary text-white py-16 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg mb-4">
            Visit us at our salon or contact us for more information. We look
            forward to serving you!
          </p>
          <p className="mb-2">
            <strong>Address:</strong> 123 Salon Lane, Cityville, Country
          </p>
          <p className="mb-2">
            <strong>Phone:</strong>{" "}
            <a href="tel:+1234567890" className="hover:underline">
              +1 234 567 890
            </a>
          </p>
          <p className="mb-6">
            <strong>Email:</strong>{" "}
            <a href="mailto:info@jakessalon.com" className="hover:underline">
              info@jakessalon.com
            </a>
          </p>
          <a
            href="/booking"
            className="bg-accent text-primary px-6 py-3 rounded-full hover:bg-secondary hover:text-white transition"
          >
            Book Now
          </a>
        </motion.div>

        {/* Leaflet Map */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="h-64 md:h-96 w-full rounded-lg shadow-lg overflow-hidden relative z-10"
        >
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                Jakes Salon <br /> 123 Salon Lane, Cityville.
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTASection;
