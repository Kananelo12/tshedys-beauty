import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import ServicesGallery from './components/ServicesGallery';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Contact from './components/Contact';

export default function Home() {

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
