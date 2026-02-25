"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <>
      <section className="py-24 sm:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Centered intro heading — matching screenshot style */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-pink-500 leading-[1.15] mb-5">
              Elegance comes from being as beautiful inside as outside
            </h2>
            <p className="text-foreground/50 text-base leading-relaxed">
              Step into our welcoming studio and experience the perfect blend of
              creativity, expertise, and care. Our mission is to bring out the
              best version of you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Stacked images */}
            <div className="relative">
              <div className="grid grid-cols-12 gap-4">
                {/* Main large image */}
                <div className="col-span-8 rounded-3xl overflow-hidden aspect-3/4">
                  <Image
                    src="/CHRISTMAS Lunch 23176BP.JPG"
                    alt="Tshedy's Beauty Parlour"
                    width={800}
                    height={1000}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                {/* Side column with two smaller images */}
                <div className="col-span-4 flex flex-col gap-4">
                  <div className="rounded-2xl overflow-hidden aspect-square">
                    <Image
                      src="/logo.jpeg"
                      alt="Styling in action"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden flex-1">
                    <Image
                      src="/CHRISTMAS Lunch 23155U.JPG"
                      alt="Studio interior"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Text */}
            <div className="lg:pl-4">
              <p className="text-pink-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                About Us
              </p>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-foreground leading-[1.1] mb-6">
                Where Beauty Meets Expertise
              </h3>

              <p className="text-foreground/70 leading-relaxed mb-4">
                We create personalized styles that celebrate your unique beauty.
              </p>

              <p className="text-foreground/50 text-[15px] leading-relaxed mb-8">
                Whether you&apos;re looking for a bold new look or just a little
                pampering, our team is here to make it happen. From precision
                braiding to stunning transformations, every style is crafted
                with love and attention to detail.
              </p>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-pink-500 hover:text-pink-600 transition-colors group"
              >
                Learn more about us
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
