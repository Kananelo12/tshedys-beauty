import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import Button from '../components/Button';
import { Search } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      title: 'Haircuts & Styling',
      description: 'Professional haircuts tailored to your face shape and style preferences. Includes wash, cut, and blow-dry.',
      price: 'R250',
      duration: '1 hour',
      icon: '💇‍♀️',
    },
    {
      title: 'Hair Coloring',
      description: 'Full color, highlights, balayage, or ombre. Using premium products for vibrant, long-lasting results.',
      price: 'R500',
      duration: '2-3 hours',
      icon: '🎨',
    },
    {
      title: 'Deep Conditioning Treatment',
      description: 'Intensive hair repair and moisture treatment for damaged, dry, or chemically treated hair.',
      price: 'R350',
      duration: '1.5 hours',
      icon: '✨',
    },
    {
      title: 'Keratin Treatment',
      description: 'Smoothing treatment that eliminates frizz and leaves hair silky, manageable, and shiny.',
      price: 'R800',
      duration: '2-3 hours',
      icon: '💎',
    },
    {
      title: 'Braiding',
      description: 'Box braids, cornrows, Ghana braids, and more. Protective styling that looks beautiful.',
      price: 'R400',
      duration: '3-5 hours',
      icon: '🌺',
    },
    {
      title: 'Weaves & Extensions',
      description: 'High-quality weaves and extensions for added length and volume. Multiple textures available.',
      price: 'R600',
      duration: '3-4 hours',
      icon: '👑',
    },
    {
      title: 'Natural Hair Care',
      description: 'Specialized care for natural hair including twist-outs, wash and go, and protective styling.',
      price: 'R300',
      duration: '1.5-2 hours',
      icon: '🍃',
    },
    {
      title: 'Bridal Hair & Makeup',
      description: 'Complete bridal beauty package including consultation, trial, and day-of styling.',
      price: 'R1500',
      duration: '3-4 hours',
      icon: '👰',
    },
    {
      title: 'Special Occasion Styling',
      description: 'Elegant updos and styling for weddings, proms, and special events.',
      price: 'R450',
      duration: '1.5-2 hours',
      icon: '🌟',
    },
    {
      title: 'Hair Spa Treatment',
      description: 'Luxurious scalp massage and treatment to promote healthy hair growth and relaxation.',
      price: 'R400',
      duration: '1 hour',
      icon: '💆‍♀️',
    },
    {
      title: 'Loc Maintenance',
      description: 'Professional retwisting, interlocking, and maintenance for dreadlocs.',
      price: 'R350',
      duration: '2-3 hours',
      icon: '🔒',
    },
    {
      title: 'Kids Styling',
      description: 'Gentle, fun styling services for children. Braids, twists, and cute hairstyles.',
      price: 'R200',
      duration: '1-2 hours',
      icon: '🧒',
    },
  ];

  const categories = [
    { name: 'All Services', count: services.length },
    { name: 'Hair Styling', count: 4 },
    { name: 'Treatments', count: 3 },
    { name: 'Braiding & Extensions', count: 3 },
    { name: 'Special Occasions', count: 2 },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 bg-cream-50">
        {/* Hero header */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900">Services</h1>
              <p className="text-gray-600 max-w-2xl mx-auto mt-3">Tailored hair, braiding, nail and beauty services crafted by expert stylists.</p>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="py-6 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3 w-full md:w-1/2">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input aria-label="Search services" placeholder="Search services" className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 bg-white" />
                </div>
              </div>

              <div className="flex items-center gap-3 justify-end">
                <select className="px-4 py-2 rounded-full border border-gray-200 bg-white">
                  <option>All Categories</option>
                  <option>Hair Styling</option>
                  <option>Braiding</option>
                  <option>Nails</option>
                </select>
                <Button variant="outline">Filter</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="transition hover:shadow-lg">
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-cream-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-3">Ready to Book?</h2>
            <p className="text-gray-600 mb-6">Select your service and choose a convenient time for your visit.</p>
            <div className="flex justify-center gap-4">
              <Button variant="outline">Contact Us</Button>
              <Button>Book Appointment</Button>
            </div>
          </div>
        </section>

        {/* Info */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-lg font-medium">Personal Consultations</h3>
                <p className="text-sm text-gray-600">Free 10-minute consultation to match style with your lifestyle.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Premium Products</h3>
                <p className="text-sm text-gray-600">We use salon-grade products selected for your needs.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Loyalty Rewards</h3>
                <p className="text-sm text-gray-600">Earn points and get exclusive offers as a member.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
