import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">Jakes Salon</h2>
          <p className="mt-2">
            Transforming your style and confidence one look at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media and Contact */}
        <div className="text-center md:text-right">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-end space-x-4 mb-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              <FaTwitter />
            </a>
          </div>
          <p className="text-sm">
            Call us:{" "}
            <a href="tel:+1234567890" className="hover:underline">
              +1 234 567 890
            </a>
          </p>
          <p className="text-sm">
            Email:{" "}
            <a
              href="mailto:info@jakessalon.com"
              className="hover:underline"
            >
              info@jakessalon.com
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-white/10 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Jakes Salon. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
