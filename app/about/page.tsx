"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Star, Gem, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-18">
        {/* Full-width Hero Banner */}
        <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
          <Image
            src="/about.jpeg"
            alt="Tshedy's Beauty Parlour"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-400 mb-2">
                Our Story
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1]">
                Faith, Passion<br />
                <span className="text-pink-300">&amp; Purpose.</span>
              </h1>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 sm:py-20 bg-cream-50">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <p className="text-lg sm:text-xl text-gray-700 font-serif leading-relaxed">
              Tshedy&apos;s Beauty Parlour began with a little girl who simply
              loved beauty and hair. What started as childhood play became a
              God-given purpose — and today it&apos;s a growing brand built on
              passion, creativity, and faith.
            </p>
          </div>
        </section>

        {/* Timeline / Alternating Story */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            {/* Milestone 1 — Left Image, Right Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-20 md:mb-28">
              <div className="rounded-2xl overflow-hidden aspect-4/3">
                <Image
                  src="/CHRISTMAS Lunch 23138D.JPG"
                  alt="Young Tshedy styling"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 rounded-full text-pink-600 text-xs font-semibold mb-4">
                  <Heart size={12} />
                  Where It All Began
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-4">
                  A Childhood Dream
                </h2>
                <div className="text-sm text-gray-600 leading-relaxed space-y-3">
                  <p>
                    From a very young age, Tshedy was always drawn to hair and
                    styling. She even believed her dolls needed hair. As a
                    child, she would apply her own hair products on them and
                    carefully style their hair. What looked like play was
                    already a passion growing.
                  </p>
                  <p>
                    At the age of 13, she started applying her aunt&apos;s
                    make-up whenever she was going to events, and she would
                    also do her mother&apos;s hair. She became known as a DIY
                    girl, often doing her own hair and leaving people amazed
                    by what she could create.
                  </p>
                </div>
              </div>
            </div>

            {/* Milestone 2 — Right Image, Left Text (reversed) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-20 md:mb-28">
              <div className="order-1 md:order-2 rounded-2xl overflow-hidden aspect-4/3">
                <Image
                  src="/CHRISTMAS Lunch 23171BK.JPG"
                  alt="Tshedy at university"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 rounded-full text-pink-600 text-xs font-semibold mb-4">
                  <Star size={12} />
                  Growth &amp; Discovery
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-4">
                  University &amp; Beyond
                </h2>
                <div className="text-sm text-gray-600 leading-relaxed space-y-3">
                  <p>
                    As she grew older and went to university, that love for
                    beauty followed her. She began styling other students&apos;
                    hair, sometimes occasionally, sometimes during holidays.
                    Each time, her confidence and skill continued to grow.
                  </p>
                  <p>
                    In 2025, during her internship, her supervisor,{" "}
                    <span className="font-semibold text-gray-900">
                      Mr Patrick Moore
                    </span>
                    , believed in her gift and encouraged her to pursue and
                    use what the Living God had placed in her hands. Those
                    words became a turning point.
                  </p>
                </div>
              </div>
            </div>

            {/* Milestone 3 — Left Image, Right Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="rounded-2xl overflow-hidden aspect-4/3">
                <Image
                  src="/logo.jpeg"
                  alt="The launch of Tshedy's"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 rounded-full text-pink-600 text-xs font-semibold mb-4">
                  <Gem size={12} />
                  The Launch
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-4">
                  From Dream to Reality
                </h2>
                <div className="text-sm text-gray-600 leading-relaxed space-y-3">
                  <p>
                    By the grace of the Living God, in December 2025, she
                    stepped out of her comfort zone and officially began her
                    journey. She hired a station in Maseru town at{" "}
                    <span className="font-semibold text-gray-900">
                      Olympic Building, Room 4
                    </span>
                    , advertised her business, and God blessed her with
                    clients.
                  </p>
                  <p>
                    Launching the make-up side of Tshedy&apos;s Beauty Parlour
                    in 2026 had always been a goal, and now that goal is
                    becoming a reality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision — Full Width Accent */}
        <section className="relative py-20 sm:py-24 bg-black text-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16">
              <div className="md:w-1/3 shrink-0">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                  <Target className="text-gold-400" size={24} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
                  Our<br />
                  <span className="text-pink-400">Vision</span>
                </h2>
              </div>
              <div className="md:w-2/3 space-y-4">
                <p className="text-white/80 leading-relaxed">
                  Our vision is to become one of the leading beauty brands in
                  Lesotho, known for excellence, creativity, and faith-driven
                  service.
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  We aim to grow into a trusted beauty space that inspires young
                  women, creates opportunities, and sets a standard of beauty
                  built on purpose, confidence, and grace.
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Today,{" "}
                  <span className="text-white font-medium">
                    Tshedy&apos;s Beauty Parlour
                  </span>{" "}
                  stands as a faith-driven beauty brand built on passion,
                  growth, and purpose. Tshedy looks forward to becoming one of
                  the leading make-up artists and hairdressers in Lesotho,
                  while glorifying God and helping every client feel beautiful
                  and confident.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gratitude */}
        <section className="py-16 sm:py-20 bg-cream-50">
          <div className="max-w-2xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-5">
              <Image src="/love.png" alt="Love" width={44} height={44} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-5">
              With Gratitude
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              She gives thanks to the{" "}
              <span className="font-semibold text-gray-900">Living God</span>{" "}
              for every step of this journey, to her parents for supporting
              her bold decision, to{" "}
              <span className="font-semibold text-gray-900">
                Mr Patrick Moore
              </span>{" "}
              for believing in her, and to everyone who continues to support
              Tshedy&apos;s Beauty Parlour.
            </p>
            <p className="text-xs text-gray-400 italic border-t border-gray-200 pt-5">
              &quot;Faith, Passion &amp; Purpose. Making Beauty a
              Blessing&quot;
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 sm:py-16 bg-white border-t border-gray-100">
          <div className="max-w-xl mx-auto px-5 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-3">
              Ready to Transform Your Look?
            </h2>
            <p className="text-gray-500 text-sm mb-7">
              Experience the passion, care, and expertise that makes
              Tshedy&apos;s Beauty Parlour special.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition-colors group"
              >
                Book Now
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
