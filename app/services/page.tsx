import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import Button from "../components/Button";
import { Search, Scissors, Waves, Flower, Wind, Sparkles, Flower2, Lock, Gem, Minus, Palette, UserRound, Eye, Droplet } from "lucide-react";

export default function ServicesPage() {
  const services = [
    // Knotless Braids
    {
      title: "Knotless Braids - Small",
      description:
        "Sleek protective braids without tension, perfect for a natural look.",
      price: "From M250",
      icon: <Scissors size={32} />,
      category: "Braids",
    },
    {
      title: "Knotless Braids - Medium",
      description:
        "Medium-sized knotless braids for a comfortable, stylish protective hairstyle.",
      price: "From M200",
      icon: <Scissors size={32} />,
      category: "Braids",
    },
    {
      title: "Knotless Braids - Large",
      description: "Large knotless braids for a bold, low-maintenance look.",
      price: "From M170",
      icon: <Scissors size={32} />,
      category: "Braids",
    },
    {
      title: "Knotless Braids - Jumbo",
      description: "Jumbo knotless braids for a trendy, voluminous style.",
      price: "From M150",
      icon: <Scissors size={32} />,
      category: "Braids",
    },

    // Curled Knotless
    {
      title: "Curled Knotless - Small",
      description:
        "Small knotless braids with beautiful curled ends for added flair.",
      price: "From M280",
      icon: <Waves size={32} />,
      category: "Braids",
    },
    {
      title: "Curled Knotless - Medium",
      description:
        "Medium curled knotless braids combining elegance with texture.",
      price: "From M230",
      icon: <Waves size={32} />,
      category: "Braids",
    },
    {
      title: "Curled Knotless - Large",
      description:
        "Large curled knotless braids for a glamorous protective style.",
      price: "From M200",
      icon: <Waves size={32} />,
      category: "Braids",
    },
    {
      title: "Curled Knotless - Jumbo",
      description: "Jumbo curled knotless braids for maximum volume and style.",
      price: "From M180",
      icon: <Waves size={32} />,
      category: "Braids",
    },

    // Boho Knotless
    {
      title: "Boho Knotless - Small",
      description:
        "Small boho knotless braids with free-flowing curls for a bohemian vibe.",
      price: "From M300",
      icon: <Flower size={32} />,
      category: "Braids",
    },
    {
      title: "Boho Knotless - Medium",
      description: "Medium boho knotless with artistic curls and texture.",
      price: "From M250",
      icon: <Flower size={32} />,
      category: "Braids",
    },
    {
      title: "Boho Knotless - Large",
      description: "Large boho knotless braids for an effortlessly chic look.",
      price: "From M220",
      icon: <Flower size={32} />,
      category: "Braids",
    },
    {
      title: "Boho Knotless - Jumbo",
      description: "Jumbo boho knotless for a bold bohemian statement.",
      price: "From M200",
      icon: <Flower size={32} />,
      category: "Braids",
    },

    // Twist Braids
    {
      title: "Twist Braids - Small",
      description:
        "Small twist braids for a refined, elegant protective style.",
      price: "From M300",
      icon: <Wind size={32} />,
      category: "Twists",
    },
    {
      title: "Twist Braids - Medium",
      description: "Medium twist braids offering versatility and style.",
      price: "From M250",
      icon: <Wind size={32} />,
      category: "Twists",
    },
    {
      title: "Twist Braids - Large",
      description: "Large twist braids for a classic, low-maintenance look.",
      price: "From M200",
      icon: <Wind size={32} />,
      category: "Twists",
    },
    {
      title: "Twist Braids - Jumbo",
      description: "Jumbo twist braids for a bold, trendy appearance.",
      price: "From M150",
      icon: <Wind size={32} />,
      category: "Twists",
    },
    {
      title: "Mini Twist (Hair)",
      description: "Delicate mini twists for a natural, textured look.",
      price: "From M80",
      icon: <Wind size={32} />,
      category: "Twists",
    },

    // Curled Twist
    {
      title: "Curled Twist - Small",
      description: "Small curled twists with beautiful bouncy ends.",
      price: "From M330",
      icon: <Sparkles size={32} />,
      category: "Twists",
    },
    {
      title: "Curled Twist - Medium",
      description: "Medium curled twists for a glamorous finish.",
      price: "From M280",
      icon: <Sparkles size={32} />,
      category: "Twists",
    },
    {
      title: "Curled Twist - Large",
      description: "Large curled twists combining volume and elegance.",
      price: "From M230",
      icon: <Sparkles size={32} />,
      category: "Twists",
    },
    {
      title: "Curled Twist - Jumbo",
      description: "Jumbo curled twists for maximum impact.",
      price: "From M180",
      icon: <Sparkles size={32} />,
      category: "Twists",
    },
    {
      title: "Mini Twist",
      description: "Delicate mini twists with curled ends.",
      price: "From M180",
      icon: <Sparkles size={32} />,
      category: "Twists",
    },

    // Boho Twist
    {
      title: "Boho Twist - Small",
      description:
        "Small boho twists with free-flowing curls for a carefree style.",
      price: "From M350",
      icon: <Flower2 size={32} />,
      category: "Twists",
    },
    {
      title: "Boho Twist - Medium",
      description: "Medium boho twists blending structure with natural flow.",
      price: "From M300",
      icon: <Flower2 size={32} />,
      category: "Twists",
    },
    {
      title: "Boho Twist - Large",
      description: "Large boho twists for an artistic, bohemian look.",
      price: "From M250",
      icon: <Flower2 size={32} />,
      category: "Twists",
    },
    {
      title: "Boho Twist - Jumbo",
      description: "Jumbo boho twists for a stunning statement style.",
      price: "From M200",
      icon: <Flower2 size={32} />,
      category: "Twists",
    },

    // Dreadlocks
    {
      title: "Eco-Dread",
      description:
        "Eco-friendly dreadlocs installation for a natural, authentic look.",
      price: "From M170",
      icon: <Lock size={32} />,
      category: "Locs",
    },
    {
      title: "Durban Dread",
      description: "Traditional Durban-style dreadlocs with expert finishing.",
      price: "From M170",
      icon: <Lock size={32} />,
      category: "Locs",
    },
    {
      title: "Butterfly Locs",
      description: "Trendy butterfly locs with a textured, distressed finish.",
      price: "From M250",
      icon: <Waves size={32} />,
      category: "Locs",
    },
    {
      title: "Faux Locs",
      description: "Temporary faux locs for the look without the commitment.",
      price: "From M250",
      icon: <Lock size={32} />,
      category: "Locs",
    },

    // Gel/Lephondo
    {
      title: "Bun",
      description: "Sleek gel bun for a polished, sophisticated look.",
      price: "From M100",
      icon: <Gem size={32} />,
      category: "Styling",
    },
    {
      title: "Braided Bun",
      description: "Elegant braided bun combining style and elegance.",
      price: "From M120",
      icon: <Gem size={32} />,
      category: "Styling",
    },
    {
      title: "Ponytail",
      description: "Sleek gel ponytail for a classic, chic style.",
      price: "From M130",
      icon: <Sparkles size={32} />,
      category: "Styling",
    },
    {
      title: "Braided Ponytail",
      description: "Beautiful braided ponytail with intricate detailing.",
      price: "From M150",
      icon: <Sparkles size={32} />,
      category: "Styling",
    },

    // Essence/Cornrows
    {
      title: "Backline",
      description: "Classic backline cornrows for a neat, timeless look.",
      price: "From M70",
      icon: <Minus size={32} />,
      category: "Cornrows",
    },
    {
      title: "Paff",
      description: "Stylish paff cornrows with a modern twist.",
      price: "From M100",
      icon: <Minus size={32} />,
      category: "Cornrows",
    },
    {
      title: "Extended Paff",
      description: "Extended paff cornrows with added length and volume.",
      price: "From M150",
      icon: <Minus size={32} />,
      category: "Cornrows",
    },
    {
      title: "Extended Backline",
      description: "Extended backline cornrows for a fuller, longer style.",
      price: "From M120",
      icon: <Minus size={32} />,
      category: "Cornrows",
    },

    // Make-up
    {
      title: "Soft Glam",
      description: "Natural, radiant makeup for everyday elegance.",
      price: "From M150",
      icon: <Palette size={32} />,
      category: "Makeup",
    },
    {
      title: "Full Glam",
      description: "Complete glamorous makeup for special occasions.",
      price: "From M200",
      icon: <Palette size={32} />,
      category: "Makeup",
    },
    {
      title: "Bridal Makeup",
      description: "Professional bridal makeup for your perfect wedding day.",
      price: "From M300",
      icon: <UserRound size={32} />,
      category: "Makeup",
    },

    // Lashes
    {
      title: "Lashes - Classic",
      description: "Classic lash extensions for natural enhancement.",
      price: "From M70",
      icon: <Eye size={32} />,
      category: "Lashes",
    },
    {
      title: "Lashes - Hybrid",
      description: "Hybrid lash extensions combining classic and volume.",
      price: "From M100",
      icon: <Eye size={32} />,
      category: "Lashes",
    },
    {
      title: "Lashes - Volume",
      description: "Full volume lash extensions for dramatic impact.",
      price: "From M120",
      icon: <Eye size={32} />,
      category: "Lashes",
    },

    // French Curls
    {
      title: "Short French Curls",
      description: "Bouncy short French curls for a playful look.",
      price: "From M200",
      icon: <Flower2 size={32} />,
      category: "Curls",
    },
    {
      title: "Short Boho French",
      description: "Short boho French curls with a carefree vibe.",
      price: "From M250",
      icon: <Flower2 size={32} />,
      category: "Curls",
    },
    {
      title: "Long French Curls",
      description: "Long French curls for elegant, flowing waves.",
      price: "From M300",
      icon: <Flower2 size={32} />,
      category: "Curls",
    },

    // Hair Wash & Extension
    {
      title: "Natural Hair Wash",
      description: "Gentle wash and conditioning for natural hair.",
      price: "From M40",
      icon: <Droplet size={32} />,
      category: "Hair Care",
    },
    {
      title: "Relaxed Hair Wash",
      description: "Specialized wash treatment for relaxed hair.",
      price: "From M30",
      icon: <Droplet size={32} />,
      category: "Hair Care",
    },
    {
      title: "Sew-in Hair Extension",
      description: "Professional sew-in extensions for length and volume.",
      price: "From M150",
      icon: <Scissors size={32} />,
      category: "Hair Care",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 bg-cream-50">
        {/* Hero header */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900">
                Services
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto mt-3">
                Tailored hair, braiding, nail and beauty services crafted by
                expert stylists.
              </p>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="py-6 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3 w-full md:w-1/2">
                <div className="relative w-full">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    aria-label="Search services"
                    placeholder="Search services"
                    className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 bg-white"
                  />
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
            <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-3">
              Ready to Book?
            </h2>
            <p className="text-gray-600 mb-6">
              Select your service and choose a convenient time for your visit.
            </p>
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
                <p className="text-sm text-gray-600">
                  Free 10-minute consultation to match style with your
                  lifestyle.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Premium Products</h3>
                <p className="text-sm text-gray-600">
                  We use salon-grade products selected for your needs.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Loyalty Rewards</h3>
                <p className="text-sm text-gray-600">
                  Earn points and get exclusive offers as a member.
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
