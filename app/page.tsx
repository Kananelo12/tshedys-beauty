import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ServiceCard from './components/ServiceCard';
import About from './components/About';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import ScrollReveal from './components/ScrollReveal';
import { Scissors, Flower, Wind, Waves, UserRound, Flower2, Sparkles } from 'lucide-react';

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
      <main className="min-h-screen relative overflow-hidden">
        <Hero />

        {/* About Section */}
        <ScrollReveal>
          <About />
        </ScrollReveal>

        {/* Features Section */}
        <ScrollReveal delay={0.2}>
          <Features />
        </ScrollReveal>

        {/* Featured Services */}
        <section className="section-padding relative">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-pink-50 to-transparent opacity-50" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold bg-linear-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-6 flex items-center justify-center gap-3">
                  <Sparkles className="text-pink-500" size={48} />
                  Our Magical Services
                </h2>
                <p className="text-lg text-charcoal-600 max-w-3xl mx-auto leading-relaxed">
                  Discover our enchanting beauty treatments, crafted with care and a touch of magic to transform you into royalty.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <ServiceCard {...service} />
                </ScrollReveal>
              ))}
            </div>

            {/* View All Button */}
            <ScrollReveal delay={0.4}>
              <div className="text-center mt-12">
                <a 
                  href="/services" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-linear-to-r from-pink-600 via-rose-500 to-purple-600 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  View All Services
                  <svg 
                    className="ml-2 w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Gallery Section */}
        <ScrollReveal>
          <Gallery />
        </ScrollReveal>

        {/* Testimonials Section */}
        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>

        {/* Pricing Section */}
        {/* <ScrollReveal>
          <Pricing />
        </ScrollReveal> */}

        {/* CTA Section */}
        {/* <ScrollReveal>
          <CTA />
        </ScrollReveal> */}

        {/* Blog Section */}
        {/* <ScrollReveal>
          <BlogList />
        </ScrollReveal> */}
      </main>
      <Footer />
    </>
  );
}
