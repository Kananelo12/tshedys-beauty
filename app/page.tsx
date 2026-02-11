import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ServiceCard from './components/ServiceCard';
import About from './components/About';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import { Scissors, Flower, Wind, Waves, UserRound, Flower2 } from 'lucide-react';

export default function Home() {
  const featuredServices = [
    {
      title: 'Knotless Braids',
      description: 'Sleek protective braids without tension in various sizes - from small to jumbo.',
      price: 'From M150',
      icon: <Scissors size={32} />,
    },
    {
      title: 'Boho Knotless',
      description: 'Trendy boho knotless braids with free-flowing curls for a bohemian vibe.',
      price: 'From M200',
      icon: <Flower size={32} />,
    },
    {
      title: 'Twist Braids',
      description: 'Elegant twist braids offering versatile protective styling in multiple sizes.',
      price: 'From M80',
      icon: <Wind size={32} />,
    },
    {
      title: 'Butterfly Locs',
      description: 'Trendy butterfly locs with a textured, distressed finish for a unique style.',
      price: 'From M250',
      icon: <Waves size={32} />,
    },
    {
      title: 'Bridal Makeup',
      description: 'Professional bridal makeup for your perfect wedding day.',
      price: 'From M300',
      icon: <UserRound size={32} />,
    },
    {
      title: 'French Curls',
      description: 'Beautiful French curls for elegant, flowing waves in short or long styles.',
      price: 'From M200',
      icon: <Flower2 size={32} />,
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
        <section id="services" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                Our Services
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover our beauty treatments, crafted with care to bring out your natural beauty.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <Gallery />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Contact CTA Section */}
        <section id="contact" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-pink-50 rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Ready to Transform Your Look?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Book your appointment today and experience professional beauty services that bring out your confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="/book" 
                  className="inline-block px-8 py-4 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition-colors duration-300"
                >
                  Book Appointment
                </a>
                <a 
                  href="tel:+26658809665" 
                  className="inline-block px-8 py-4 border-2 border-pink-500 text-pink-600 font-bold rounded-full hover:bg-pink-50 transition-colors duration-300"
                >
                  Call Us: +266 58809665
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
