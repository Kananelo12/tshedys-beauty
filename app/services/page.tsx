import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import Link from "next/link";
import { Search, Scissors, Waves, Flower, Wind, Sparkles, Flower2, Lock, Gem, Minus, Palette, UserRound, Eye, Droplet, ArrowRight } from "lucide-react";

export default function ServicesPage() {
  const services = [
    // Knotless Braids
    {
      title: "Knotless Braids - Small",
      description:
        "Sleek protective braids without tension, perfect for a natural look.",
      price: "From M250",
      icon: <Scissors size={20} />,
      category: "Braids",
    },
    {
      title: "Knotless Braids - Medium",
      description:
        "Medium-sized knotless braids for a comfortable, stylish protective hairstyle.",
      price: "From M200",
      icon: <Scissors size={20} />,
      category: "Braids",
    },
    {
      title: "Knotless Braids - Large",
      description: "Large knotless braids for a bold, low-maintenance look.",
      price: "From M170",
      icon: <Scissors size={20} />,
      category: "Braids",
    },
    {
      title: "Knotless Braids - Jumbo",
      description: "Jumbo knotless braids for a trendy, voluminous style.",
      price: "From M150",
      icon: <Scissors size={20} />,
      category: "Braids",
    },
    {
      title: "Curled Knotless - Small",
      description:
        "Small knotless braids with beautiful curled ends for added flair.",
      price: "From M280",
      icon: <Waves size={20} />,
      category: "Braids",
    },
    {
      title: "Curled Knotless - Medium",
      description:
        "Medium curled knotless braids combining elegance with texture.",
      price: "From M230",
      icon: <Waves size={20} />,
      category: "Braids",
    },
    {
      title: "Curled Knotless - Large",
      description:
        "Large curled knotless braids for a glamorous protective style.",
      price: "From M200",
      icon: <Waves size={20} />,
      category: "Braids",
    },
    {
      title: "Curled Knotless - Jumbo",
      description: "Jumbo curled knotless braids for maximum volume and style.",
      price: "From M180",
      icon: <Waves size={20} />,
      category: "Braids",
    },
    {
      title: "Boho Knotless - Small",
      description:
        "Small boho knotless braids with free-flowing curls for a bohemian vibe.",
      price: "From M300",
      icon: <Flower size={20} />,
      category: "Braids",
    },
    {
      title: "Boho Knotless - Medium",
      description: "Medium boho knotless with artistic curls and texture.",
      price: "From M250",
      icon: <Flower size={20} />,
      category: "Braids",
    },
    {
      title: "Boho Knotless - Large",
      description: "Large boho knotless braids for an effortlessly chic look.",
      price: "From M220",
      icon: <Flower size={20} />,
      category: "Braids",
    },
    {
      title: "Boho Knotless - Jumbo",
      description: "Jumbo boho knotless for a bold bohemian statement.",
      price: "From M200",
      icon: <Flower size={20} />,
      category: "Braids",
    },
    {
      title: "Twist Braids - Small",
      description:
        "Small twist braids for a refined, elegant protective style.",
      price: "From M300",
      icon: <Wind size={20} />,
      category: "Twists",
    },
    {
      title: "Twist Braids - Medium",
      description: "Medium twist braids offering versatility and style.",
      price: "From M250",
      icon: <Wind size={20} />,
      category: "Twists",
    },
    {
      title: "Twist Braids - Large",
      description: "Large twist braids for a classic, low-maintenance look.",
      price: "From M200",
      icon: <Wind size={20} />,
      category: "Twists",
    },
    {
      title: "Twist Braids - Jumbo",
      description: "Jumbo twist braids for a bold, trendy appearance.",
      price: "From M150",
      icon: <Wind size={20} />,
      category: "Twists",
    },
    {
      title: "Mini Twist (Hair)",
      description: "Delicate mini twists for a natural, textured look.",
      price: "From M80",
      icon: <Wind size={20} />,
      category: "Twists",
    },
    {
      title: "Curled Twist - Small",
      description: "Small curled twists with beautiful bouncy ends.",
      price: "From M330",
      icon: <Sparkles size={20} />,
      category: "Twists",
    },
    {
      title: "Curled Twist - Medium",
      description: "Medium curled twists for a glamorous finish.",
      price: "From M280",
      icon: <Sparkles size={20} />,
      category: "Twists",
    },
    {
      title: "Curled Twist - Large",
      description: "Large curled twists combining volume and elegance.",
      price: "From M230",
      icon: <Sparkles size={20} />,
      category: "Twists",
    },
    {
      title: "Curled Twist - Jumbo",
      description: "Jumbo curled twists for maximum impact.",
      price: "From M180",
      icon: <Sparkles size={20} />,
      category: "Twists",
    },
    {
      title: "Mini Twist",
      description: "Delicate mini twists with curled ends.",
      price: "From M180",
      icon: <Sparkles size={20} />,
      category: "Twists",
    },
    {
      title: "Boho Twist - Small",
      description:
        "Small boho twists with free-flowing curls for a carefree style.",
      price: "From M350",
      icon: <Flower2 size={20} />,
      category: "Twists",
    },
    {
      title: "Boho Twist - Medium",
      description: "Medium boho twists blending structure with natural flow.",
      price: "From M300",
      icon: <Flower2 size={20} />,
      category: "Twists",
    },
    {
      title: "Boho Twist - Large",
      description: "Large boho twists for an artistic, bohemian look.",
      price: "From M250",
      icon: <Flower2 size={20} />,
      category: "Twists",
    },
    {
      title: "Boho Twist - Jumbo",
      description: "Jumbo boho twists for a stunning statement style.",
      price: "From M200",
      icon: <Flower2 size={20} />,
      category: "Twists",
    },
    {
      title: "Eco-Dread",
      description:
        "Eco-friendly dreadlocs installation for a natural, authentic look.",
      price: "From M170",
      icon: <Lock size={20} />,
      category: "Locs",
    },
    {
      title: "Durban Dread",
      description: "Traditional Durban-style dreadlocs with expert finishing.",
      price: "From M170",
      icon: <Lock size={20} />,
      category: "Locs",
    },
    {
      title: "Butterfly Locs",
      description: "Trendy butterfly locs with a textured, distressed finish.",
      price: "From M250",
      icon: <Waves size={20} />,
      category: "Locs",
    },
    {
      title: "Faux Locs",
      description: "Temporary faux locs for the look without the commitment.",
      price: "From M250",
      icon: <Lock size={20} />,
      category: "Locs",
    },
    {
      title: "Bun",
      description: "Sleek gel bun for a polished, sophisticated look.",
      price: "From M100",
      icon: <Gem size={20} />,
      category: "Styling",
    },
    {
      title: "Braided Bun",
      description: "Elegant braided bun combining style and elegance.",
      price: "From M120",
      icon: <Gem size={20} />,
      category: "Styling",
    },
    {
      title: "Ponytail",
      description: "Sleek gel ponytail for a classic, chic style.",
      price: "From M130",
      icon: <Sparkles size={20} />,
      category: "Styling",
    },
    {
      title: "Braided Ponytail",
      description: "Beautiful braided ponytail with intricate detailing.",
      price: "From M150",
      icon: <Sparkles size={20} />,
      category: "Styling",
    },
    {
      title: "Backline",
      description: "Classic backline cornrows for a neat, timeless look.",
      price: "From M70",
      icon: <Minus size={20} />,
      category: "Cornrows",
    },
    {
      title: "Paff",
      description: "Stylish paff cornrows with a modern twist.",
      price: "From M100",
      icon: <Minus size={20} />,
      category: "Cornrows",
    },
    {
      title: "Extended Paff",
      description: "Extended paff cornrows with added length and volume.",
      price: "From M150",
      icon: <Minus size={20} />,
      category: "Cornrows",
    },
    {
      title: "Extended Backline",
      description: "Extended backline cornrows for a fuller, longer style.",
      price: "From M120",
      icon: <Minus size={20} />,
      category: "Cornrows",
    },
    {
      title: "Soft Glam",
      description: "Natural, radiant makeup for everyday elegance.",
      price: "From M150",
      icon: <Palette size={20} />,
      category: "Makeup",
    },
    {
      title: "Full Glam",
      description: "Complete glamorous makeup for special occasions.",
      price: "From M200",
      icon: <Palette size={20} />,
      category: "Makeup",
    },
    {
      title: "Bridal Makeup",
      description: "Professional bridal makeup for your perfect wedding day.",
      price: "From M300",
      icon: <UserRound size={20} />,
      category: "Makeup",
    },
    {
      title: "Lashes - Classic",
      description: "Classic lash extensions for natural enhancement.",
      price: "From M70",
      icon: <Eye size={20} />,
      category: "Lashes",
    },
    {
      title: "Lashes - Hybrid",
      description: "Hybrid lash extensions combining classic and volume.",
      price: "From M100",
      icon: <Eye size={20} />,
      category: "Lashes",
    },
    {
      title: "Lashes - Volume",
      description: "Full volume lash extensions for dramatic impact.",
      price: "From M120",
      icon: <Eye size={20} />,
      category: "Lashes",
    },
    {
      title: "Short French Curls",
      description: "Bouncy short French curls for a playful look.",
      price: "From M200",
      icon: <Flower2 size={20} />,
      category: "Curls",
    },
    {
      title: "Short Boho French",
      description: "Short boho French curls with a carefree vibe.",
      price: "From M250",
      icon: <Flower2 size={20} />,
      category: "Curls",
    },
    {
      title: "Long French Curls",
      description: "Long French curls for elegant, flowing waves.",
      price: "From M300",
      icon: <Flower2 size={20} />,
      category: "Curls",
    },
    {
      title: "Natural Hair Wash",
      description: "Gentle wash and conditioning for natural hair.",
      price: "From M40",
      icon: <Droplet size={20} />,
      category: "Hair Care",
    },
    {
      title: "Relaxed Hair Wash",
      description: "Specialized wash treatment for relaxed hair.",
      price: "From M30",
      icon: <Droplet size={20} />,
      category: "Hair Care",
    },
    {
      title: "Sew-in Hair Extension",
      description: "Professional sew-in extensions for length and volume.",
      price: "From M150",
      icon: <Scissors size={20} />,
      category: "Hair Care",
    },
  ];

  const categories = ["All", ...Array.from(new Set(services.map(s => s.category)))];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[72px] bg-cream-50">
        {/* Header */}
        <section className="py-14 sm:py-16">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-600 mb-3">
              Our Menu
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">
              Services & Pricing
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
              Tailored hair, braiding, and beauty services crafted by expert stylists
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-4 bg-white border-b border-gray-100 sticky top-[72px] z-30">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  aria-label="Search services"
                  placeholder="Search services..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none transition-colors"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium border border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-600 transition-colors first:bg-pink-500 first:text-white first:border-pink-500"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-black text-white">
          <div className="max-w-2xl mx-auto px-5 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-3">
              Ready to Book?
            </h2>
            <p className="text-white/60 text-sm mb-7">
              Select your service and choose a convenient time for your visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white/80 text-sm font-semibold rounded-full hover:bg-white/5 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition-colors group"
              >
                Book Appointment
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Info Strip */}
        <section className="py-12 bg-cream-50">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Personal Consultations</h3>
                <p className="text-xs text-gray-500">Free 10-minute consultation to match style with your lifestyle.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Premium Products</h3>
                <p className="text-xs text-gray-500">We use salon-grade products selected for your needs.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Loyalty Rewards</h3>
                <p className="text-xs text-gray-500">Earn points and get exclusive offers as a member.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
