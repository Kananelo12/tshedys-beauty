import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';

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
      <main className="min-h-screen pt-20 bg-cream-50">
        {/* Header Section */}
        <section className="relative section-padding bg-gradient-to-br from-sage-50 to-cream-50">
          <div className="relative max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-serif font-medium text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of beauty services, each designed to enhance your natural beauty 
              and leave you feeling confident and radiant.
            </p>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    index === 0
                      ? 'bg-sage-600 text-white'
                      : 'bg-cream-100 text-gray-700 hover:bg-cream-200 hover:text-sage-600 border border-gray-200'
                  }`}
                >
                  {category.name} <span className="ml-1 opacity-70">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="section-padding bg-sage-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6">
              Ready to Book Your Service?
            </h2>
            <p className="text-xl text-sage-50 mb-8">
              Choose your preferred service and schedule your appointment today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book"
                className="px-8 py-3 bg-white text-sage-600 font-medium rounded-lg hover:bg-cream-50 transition-all duration-300"
              >
                Book Appointment
              </a>
              <a
                href="/contact"
                className="px-8 py-3 bg-transparent text-white border-2 border-white font-medium rounded-lg hover:bg-white hover:text-sage-600 transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl mb-3">📋</div>
                <h3 className="text-lg font-serif font-medium text-gray-900 mb-2">Consultation Available</h3>
                <p className="text-sm text-gray-600">
                  Not sure which service? Book a free consultation with our experts
                </p>
              </div>
              <div>
                <div className="text-3xl mb-3">💳</div>
                <h3 className="text-lg font-serif font-medium text-gray-900 mb-2">Flexible Payment</h3>
                <p className="text-sm text-gray-600">
                  We accept cash, card, and digital payments for your convenience
                </p>
              </div>
              <div>
                <div className="text-3xl mb-3">🎁</div>
                <h3 className="text-lg font-serif font-medium text-gray-900 mb-2">Package Deals</h3>
                <p className="text-sm text-gray-600">
                  Ask about our service packages and loyalty discounts
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
