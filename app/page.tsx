import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ServiceCard from './components/ServiceCard';
import About from './components/About';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import BlogList from './components/BlogList';
import ScrollReveal from './components/ScrollReveal';

export default function Home() {
  const featuredServices = [
    {
      title: 'Royal Hair Styling',
      description: 'Professional cuts, luxury styling, and premium treatments fit for royalty.',
      price: 'R250',
      duration: '1-2 hours',
      icon: '👑',
    },
    {
      title: 'Magical Treatments',
      description: 'Enchanting deep conditioning, keratin magic, and transformative hair repair.',
      price: 'R350',
      duration: '1.5 hours',
      icon: '✨',
    },
    {
      title: 'Fantasy Braiding',
      description: 'Mystical braids, magical weaves, and fantasy extensions for every occasion.',
      price: 'R400',
      duration: '3-5 hours',
      icon: '🌺',
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
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold bg-linear-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-6">
                  ✨ Our Magical Services
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
        <ScrollReveal>
          <Pricing />
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal>
          <CTA />
        </ScrollReveal>

        {/* Blog Section */}
        <ScrollReveal>
          <BlogList />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
