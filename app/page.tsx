import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ServiceCard from './components/ServiceCard';
import Button from './components/Button';
import About from './components/About';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import BlogList from './components/BlogList';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50">
        <Hero />

        {/* New sections inspired by the design */}
        <About />
        <Features />

        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 mb-4">Featured Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Discover our most popular beauty treatments, crafted with care.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        <Gallery />
        <Pricing />
        <CTA />
        <BlogList />
      </main>
    </div>
  );
}
