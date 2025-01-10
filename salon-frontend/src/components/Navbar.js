"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      setIsLoggedIn(true);
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserName(payload.name);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    setUserName("");
    router.push("/login");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-primary shadow-lg" : "bg-background"
      }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between p-4 ${
          scrolled ? "text-white" : "text-primary-foreground"
        }`}
      >
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link href="/">Jakes Salon</Link>
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/services" className="hover:underline">
            Services
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link
            href="/booking"
            className={`px-4 py-2 rounded transition ${
              scrolled
                ? "bg-white text-primary"
                : "bg-accent text-background hover:bg-secondary hover:text-white"
            }`}
          >
            Book Now
          </Link>

          {/* Login/Logout Button */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span>Hi, {userName}</span>
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded transition ${
                  scrolled
                    ? "bg-white text-primary"
                    : "bg-accent text-background hover:bg-secondary hover:text-white"
                }`}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={`px-4 py-2 rounded transition ${
                scrolled
                  ? "bg-white text-primary"
                  : "bg-accent text-background hover:bg-secondary hover:text-white"
              }`}
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${
            scrolled ? "text-white" : "text-primary-foreground"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <span>&#x2715;</span> : <span>&#9776;</span>}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-primary text-white shadow-lg md:hidden">
            <ul className="flex flex-col space-y-4 p-4">
              <li>
                <Link href="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" onClick={() => setIsOpen(false)}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setIsOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="bg-white text-primary px-4 py-2 rounded hover:bg-secondary hover:text-white transition"
                  onClick={() => setIsOpen(false)}
                >
                  Book Now
                </Link>
              </li>
              <li>
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="bg-white text-primary px-4 py-2 rounded hover:bg-secondary hover:text-white transition"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="bg-white text-primary px-4 py-2 rounded hover:bg-secondary hover:text-white transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
