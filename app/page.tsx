import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import ServicesGallery from "./components/ServicesGallery";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import {
  UserRound,
  Wind,
  Flower,
  Waves,
  Scissors,
} from "lucide-react";

export default function Home() {
  const featuredServices = [
    {
      title: "Knotless Braids",
      description:
        "Sleek protective braids without tension — from small to jumbo sizes.",
      price: "From M150",
      icon: <Scissors size={20} />,
    },
    {
      title: "Boho Knotless",
      description:
        "Trendy boho knotless braids with free-flowing curls for a bohemian vibe.",
      price: "From M200",
      icon: <Flower size={20} />,
    },
    {
      title: "Twist Braids",
      description:
        "Elegant twist braids offering versatile protective styling in multiple sizes.",
      price: "From M80",
      icon: <Wind size={20} />,
    },
    {
      title: "Butterfly Locs",
      description:
        "Trendy butterfly locs with a textured, distressed finish for a unique look.",
      price: "From M250",
      icon: <Waves size={20} />,
    },
    {
      title: "Bridal Makeup",
      description:
        "Professional bridal makeup crafted for your perfect wedding day.",
      price: "From M300",
      icon: <UserRound size={20} />,
    },
    // {
    //   title: "French Curls",
    //   description:
    //     "Beautiful French curls for elegant, flowing waves in short or long styles.",
    //   price: "From M200",
    //   icon: <Flower2 size={20} />,
    // },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />

        {/* About Section */}
        <section id="about">
          <About />
        </section>

        {/* Features Section */}
        <Features />

        {/* Services Section */}
        <section id="services" className="py-24 sm:py-32 bg-cream-100">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            {/* Header — left-aligned with CTA on the right */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-pink-500 mb-3">
                  What We Offer
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-foreground">
                  Our Services
                </h2>
              </div>
              <p className="text-sm text-foreground/50 max-w-sm leading-relaxed">
                Beauty treatments crafted with care to bring out your natural confidence
              </p>
            </div>

            {/* Bento-style layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredServices.map((service, index) => (
                <div
                  key={index}
                  className={`group relative bg-white rounded-2xl border border-cream-200 p-7 sm:p-8 hover:shadow-md transition-all duration-400 ${
                    index === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""
                  }`}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center mb-5 group-hover:bg-pink-500 transition-colors duration-400">
                    <div className="text-pink-500 group-hover:text-white transition-colors duration-400">
                      {service.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-serif font-medium text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-foreground/50 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Price badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cream-100 rounded-full">
                    <span className="text-[11px] text-foreground/40 uppercase tracking-wider font-medium">From</span>
                    <span className="text-sm font-semibold text-pink-500">
                      {service.price.replace("From ", "")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <ServicesGallery />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Contact Section */}
        <section id="contact">
          <Contact />
        </section>

        {/* CTA Section */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
