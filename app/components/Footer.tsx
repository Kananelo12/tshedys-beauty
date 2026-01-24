import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-white mb-3">GlowHaven</h3>
            <p className="text-gray-300 text-sm leading-relaxed">Luxury hair & beauty services tailored to your style. Book your appointment for a personalised experience.</p>
            <p className="mt-4 text-sm text-gray-400">+27 123 456 789</p>
            <p className="text-sm text-gray-400">info@glowhaven.com</p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Services</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/services" className="hover:text-sage-300">Hair Styling</Link></li>
              <li><Link href="/services" className="hover:text-sage-300">Braiding & Extensions</Link></li>
              <li><Link href="/services" className="hover:text-sage-300">Nails & Manicure</Link></li>
              <li><Link href="/services" className="hover:text-sage-300">Beauty Treatments</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Subscribe</h4>
            <p className="text-gray-300 text-sm mb-4">Get occasional updates and exclusive offers.</p>
            <form className="flex max-w-sm">
              <input aria-label="Email" type="email" placeholder="Your email" className="w-full px-3 py-2 rounded-l-full bg-gray-800 text-gray-200 placeholder-gray-400" />
              <button className="px-4 bg-sage-600 text-white rounded-r-full">Join</button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} GlowHaven. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
