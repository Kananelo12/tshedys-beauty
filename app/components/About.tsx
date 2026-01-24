import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden">
              <Image src="/hero.webp" alt="styling" width={600} height={440} className="w-full h-48 object-cover" />
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image src="/hero.webp" alt="treatment" width={600} height={440} className="w-full h-48 object-cover" />
            </div>
            <div className="rounded-lg overflow-hidden col-span-2">
              <Image src="/hero.webp" alt="relax" width={1200} height={440} className="w-full h-64 object-cover" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-serif font-semibold text-gray-900 mb-4">25+ Years of Expertise in Beauty</h2>
            <p className="text-gray-600 mb-6">We combine refined technique and premium products to deliver beautiful, long-lasting results. Our stylists and therapists focus on personalised care in a calm, welcoming environment.</p>
            <p className="text-gray-700 mb-6">From contemporary cuts to traditional braiding and advanced nail artistry, we take care of every detail to ensure you leave feeling confident.</p>
            <Link href="/book" className="inline-flex items-center px-6 py-3 rounded-full border-2 border-sage-600 text-sage-700">Appointment Now</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
