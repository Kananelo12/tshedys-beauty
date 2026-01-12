import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ServiceCard from './components/ServiceCard';
import Button from './components/Button';

export default function Home() {
  const featuredServices = [
    {
      title: 'Hair Styling',
      description: 'Professional cuts, styling, and treatments tailored to your unique beauty.',
      price: 'R250',
      duration: '1-2 hours',
      icon: '💇‍♀️',
    },
    {
      title: 'Hair Treatments',
      description: 'Deep conditioning, keratin treatments, and hair repair solutions.',
      price: 'R350',
      duration: '1.5 hours',
      icon: '✨',
    },
    {
      title: 'Braiding & Extensions',
      description: 'Beautiful braids, weaves, and extensions for any occasion.',
      price: 'R400',
      duration: '3-5 hours',
      icon: '🌺',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Background with gold glow effect */}
          <div className="absolute inset-0 bg-gold-glow opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-charcoal-950/95 to-charcoal-950"></div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-script font-bold text-gold-500 mb-6 gold-glow">
              Tshedy's Beauty Parlour
            </h1>
            
            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Where Elegance Meets Excellence
            </p>
            
            <p className="text-base md:text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience premium beauty services in a luxurious, welcoming atmosphere. 
              From stunning hairstyles to rejuvenating treatments, we bring your beauty vision to life.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/book">
                <Button size="lg" className="w-full sm:w-auto">
                  Book Your Appointment
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>5-Star Rated</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Licensed Professionals</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Flexible Hours</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Services Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-charcoal-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-script font-bold text-gold-500 mb-4">
                Featured Services
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Discover our most popular beauty treatments, crafted with care and expertise
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/services">
                <Button variant="secondary" size="lg">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-charcoal-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-script font-bold text-gold-500 mb-4">
                Why Choose Us
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Experience the difference that sets us apart
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '🏆',
                  title: 'Expert Stylists',
                  description: 'Highly trained professionals with years of experience',
                },
                {
                  icon: '💎',
                  title: 'Premium Products',
                  description: 'Only the finest beauty products for exceptional results',
                },
                {
                  icon: '🌟',
                  title: 'Personalized Care',
                  description: 'Tailored treatments designed just for you',
                },
                {
                  icon: '✨',
                  title: 'Relaxing Atmosphere',
                  description: 'A serene space where you can unwind and rejuvenate',
                },
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gold-500 mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-script font-bold text-gold-500 mb-6">
              Ready to Transform Your Look?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Book your appointment today and experience luxury beauty services
            </p>
            <Link href="/book">
              <Button size="lg" className="shadow-gold-glow-lg">
                Schedule Your Visit
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
