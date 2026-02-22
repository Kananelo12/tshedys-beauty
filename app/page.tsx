import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ServiceCard from './components/ServiceCard';
import About from './components/About';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import { Scissors, Flower, Wind, Waves, UserRound, Flower2 } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredServices = [
    {
      title: 'Knotless Braids',
      description: 'Sleek protective braids without tension — from small to jumbo sizes.',
      price: 'From M150',
      icon: <Scissors size={20} />,
    },
    {
      title: 'Boho Knotless',
      description: 'Trendy boho knotless braids with free-flowing curls for a bohemian vibe.',
      price: 'From M200',
      icon: <Flower size={20} />,
    },
    {
      title: 'Twist Braids',
      description: 'Elegant twist braids offering versatile protective styling in multiple sizes.',
      price: 'From M80',
      icon: <Wind size={20} />,
    },
    {
      title: 'Butterfly Locs',
      description: 'Trendy butterfly locs with a textured, distressed finish for a unique look.',
      price: 'From M250',
      icon: <Waves size={20} />,
    },
    {
      title: 'Bridal Makeup',
      description: 'Professional bridal makeup crafted for your perfect wedding day.',
      price: 'From M300',
      icon: <UserRound size={20} />,
    },
    {
      title: 'French Curls',
      description: 'Beautiful French curls for elegant, flowing waves in short or long styles.',
      price: 'From M200',
      icon: <Flower2 size={20} />,
    },
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
        <section id="services" className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-600 mb-3">
                What We Offer
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-base text-gray-500 max-w-lg mx-auto">
                Beauty treatments crafted with care to bring out your natural confidence
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors group"
              >
                View All Services
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <Gallery />

        {/* Testimonials Section */}
        <Testimonials />

        {/* CTA Section */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
