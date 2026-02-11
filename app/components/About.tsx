'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <Image 
                src="/CHRISTMAS Lunch 23185BY.JPG" 
                alt="styling" 
                width={600} 
                height={440} 
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md">
              <Image 
                src="/CHRISTMAS Lunch 23171BK.JPG" 
                alt="treatment" 
                width={600} 
                height={440} 
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div className="rounded-2xl overflow-hidden col-span-2 shadow-md">
              <Image 
                src="/CHRISTMAS Lunch 23222DJ.JPG" 
                alt="relax" 
                width={1200} 
                height={440} 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              About Tshedy Beauty
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We combine refined technique and premium products to deliver beautiful, 
              long-lasting results. Our stylists focus on personalized care in a welcoming environment.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              From contemporary cuts to traditional braiding and advanced nail artistry, 
              we take care of every detail to ensure you leave feeling confident and beautiful.
            </p>
            <Link 
              href="/book" 
              className="inline-block px-8 py-4 rounded-full bg-pink-500 text-white font-bold hover:bg-pink-600 transition-colors duration-300"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
