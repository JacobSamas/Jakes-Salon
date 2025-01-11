"use client";

const AboutPage = () => {
  return (
    <div className="bg-background text-primary py-16 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* About Text */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Welcome to Jake&apos;s Salon</h2>
            <p className="text-lg mb-4">
              At Jake&apos;s Salon, we pride ourselves on delivering top-notch beauty and wellness services. From precision haircuts to rejuvenating spa treatments, we are dedicated to making you look and feel your best.
            </p>
            <p className="text-lg mb-4">
              Our experienced team of stylists and therapists are passionate about their craft and committed to providing a relaxing and enjoyable experience.
            </p>
            <p className="text-lg">
              We look forward to welcoming you and helping you achieve the look of your dreams.
            </p>
          </div>

          {/* About Image */}
          <div className="h-64 md:h-96 bg-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 font-bold text-lg">Image Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
