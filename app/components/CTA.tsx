import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-20 bg-cover bg-center" style={{ backgroundColor: '#f3eae3' }}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-3xl font-serif font-semibold text-gray-900 mb-4">All kinds of hair & beauty treatments for your body & soul</h3>
        <p className="text-gray-600 mb-8">Pamper your body and refresh with our curated beauty services.</p>
        <Link href="/book" className="inline-flex items-center px-6 py-3 rounded-full bg-sage-600 text-white">Appointment Now</Link>
      </div>
    </section>
  );
}
