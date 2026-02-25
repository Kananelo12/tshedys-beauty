"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { Heart, Star, Gem, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar hasDarkHero />
      <main className="min-h-screen pt-18">
        {/* Full-width Hero Banner */}
        <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
          <Image
            src="/CHRISTMAS Lunch 23155U.JPG"
            alt="Tshedy's Beauty Parlour"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-3">
              Our Story
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-white leading-[1.1]">
              Faith, Passion
              <br />
              &amp; Purpose.
            </h1>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 sm:py-28 bg-background">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
            <p className="text-lg sm:text-xl text-foreground/70 font-serif leading-relaxed">
              Tshedy&apos;s Beauty Parlour began with a little girl who simply
              loved beauty and hair. What started as childhood play became a
              God-given purpose, and today it&apos;s a growing brand built on
              passion, creativity, and faith.
            </p>
          </div>
        </section>

        {/* Vision */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/CHRISTMAS Lunch 23300GJ.JPG"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16">
              <div className="md:w-1/3 shrink-0">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                  <Target className="text-pink-300" size={22} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-medium leading-tight text-white">
                  Our
                  <br />
                  Vision
                </h2>
              </div>
              <div className="md:w-2/3 space-y-4">
                <p className="text-white/90 leading-relaxed">
                  Our vision is to become one of the leading beauty brands in
                  Lesotho, known for excellence, creativity, and faith-driven
                  service.
                </p>
                <p className="text-white/90 text-sm leading-relaxed">
                  We aim to grow into a trusted beauty space that inspires young
                  women, creates opportunities, and sets a standard of beauty
                  built on purpose, confidence, and grace.
                </p>
                <p className="text-white/90 text-sm leading-relaxed">
                  Today,{" "}
                  <span className="text-white font-medium">
                    Tshedy&apos;s Beauty Parlour
                  </span>{" "}
                  stands as a faith-driven beauty brand built on passion,
                  growth, and purpose. Tshedy looks forward to becoming one of
                  the leading make-up artists and hairdressers in Lesotho, while
                  glorifying God and helping every client feel beautiful and
                  confident.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline / Alternating Story */}
        <section className="py-20 sm:py-28 bg-cream-100">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
            {/* Milestone 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center mb-24 md:mb-32">
              <div className="rounded-2xl overflow-hidden aspect-4/3">
                <Image
                  src="/CHRISTMAS Lunch 23144J.JPG"
                  alt="Young Tshedy styling"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-pink-50 rounded-full text-pink-500 text-xs font-semibold mb-5">
                  <Heart size={12} />
                  Where It All Began
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-foreground mb-5">
                  A Childhood Dream
                </h2>
                <div className="text-sm text-foreground/55 leading-relaxed space-y-3">
                  <p>
                    From a very young age, Tshedy was always drawn to hair and
                    styling. She even believed her dolls needed hair. As a
                    child, she would apply her own hair products on them and
                    carefully style their hair. What looked like play was
                    already a passion growing.
                  </p>
                  <p>
                    At the age of 13, she started applying her aunt&apos;s
                    make-up whenever she was going to events, and she would also
                    do her mother&apos;s hair. She became known as a DIY girl,
                    often doing her own hair and leaving people amazed by what
                    she could create.
                  </p>
                </div>
              </div>
            </div>

            {/* Milestone 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center mb-24 md:mb-32">
              <div className="order-1 md:order-2 rounded-2xl overflow-hidden aspect-4/3">
                <Image
                  src="/CHRISTMAS Lunch 23138D.JPG"
                  alt="Tshedy at university"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-pink-50 rounded-full text-pink-500 text-xs font-semibold mb-5">
                  <Star size={12} />
                  Growth &amp; Discovery
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-foreground mb-5">
                  University &amp; Beyond
                </h2>
                <div className="text-sm text-foreground/55 leading-relaxed space-y-3">
                  <p>
                    As she grew older and went to university, that love for
                    beauty followed her. She began styling other students&apos;
                    hair, sometimes occasionally, sometimes during holidays.
                    Each time, her confidence and skill continued to grow.
                  </p>
                  <p>
                    In 2025, during her internship, her supervisor,{" "}
                    <span className="font-semibold text-foreground">
                      Mr Patrick Moore
                    </span>
                    , believed in her gift and encouraged her to pursue and use
                    what the Living God had placed in her hands. Those words
                    became a turning point.
                  </p>
                </div>
              </div>
            </div>

            {/* Milestone 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
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
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-pink-50 rounded-full text-pink-500 text-xs font-semibold mb-5">
                  <Gem size={12} />
                  The Launch
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-foreground mb-5">
                  From Dream to Reality
                </h2>
                <div className="text-sm text-foreground/55 leading-relaxed space-y-3">
                  <p>
                    By the grace of the Living God, in December 2025, she
                    stepped out of her comfort zone and officially began her
                    journey. She hired a station in Maseru town at{" "}
                    <span className="font-semibold text-foreground">
                      Olympic Building, Room 4
                    </span>
                    , advertised her business, and God blessed her with clients.
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
      </main>
      <Footer />
    </>
  );
}
