'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <section className="py-20 sm:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-14 items-center">
          {/* Left — Large Portrait */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-3/4 sm:aspect-4/5">
              <Image
                src="/CHRISTMAS Lunch 23138D.JPG"
                alt="Tshedy's Beauty Parlour"
                width={800}
                height={1000}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Right — Text + Small Images */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-bold text-gray-900 leading-tight mb-4">
              Where Beauty Meets Expertise.
            </h2>

            <p className="text-sm sm:text-base font-medium text-gray-700 mb-4">
              We create personalized styles that celebrate your unique beauty.
            </p>

            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Step into our welcoming studio and experience the perfect blend of creativity,
              expertise, and care. Our mission is to bring out the best version of you with
              tailored hairstyles, precision braiding, and stunning transformations. Whether
              you&apos;re looking for a bold new look or just a little pampering, our team is
              here to make it happen.
            </p>

            <Link
              href="/about"
              className="inline-block px-6 py-2.5 bg-pink-600 text-white text-sm font-semibold rounded-md hover:bg-pink-700 transition-colors mb-8"
            >
              Learn more about us
            </Link>

            {/* 3 Small Images Row */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded-lg overflow-hidden aspect-4/3">
                <Image
                  src="/logo.jpeg"
                  alt="Our salon"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden aspect-4/3">
                <Image
                  src="/CHRISTMAS Lunch 23171BK.JPG"
                  alt="Styling in action"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden aspect-4/3">
                <Image
                  src="/CHRISTMAS Lunch 23303GM.JPG"
                  alt="Studio interior"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
