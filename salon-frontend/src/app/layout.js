import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Jake's Salon",
  description:
    "Jake's Salon is a full-service salon located in the heart of downtown Toronto.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-primary">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
