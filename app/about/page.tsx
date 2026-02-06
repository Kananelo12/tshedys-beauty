"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 bg-linear-to-b from-blush-50 via-white to-lilac-50">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blush-300 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-lilac-300 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                Our Story ✨
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A journey of passion, faith, and beauty — from a little
                girl&apos;s dream to a thriving beauty parlour.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Story Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-blush-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-linear-to-br from-blush-400 to-lilac-400 rounded-full flex items-center justify-center text-2xl">
                      👧🏾
                    </div>
                    <h2 className="text-2xl font-serif font-semibold text-gray-900">
                      Where It All Began
                    </h2>
                  </div>

                  <div className="prose prose-pink max-w-none text-gray-700 space-y-4">
                    <p>
                      Tshedy&apos;s Beauty Parlour began with a little girl who
                      simply loved beauty and hair.
                    </p>
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

                <div className="bg-linear-to-br from-lilac-50 to-blush-50 rounded-3xl p-8 shadow-sm border border-lilac-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-linear-to-br from-lilac-400 to-rosegold-400 rounded-full flex items-center justify-center text-2xl">
                      🎓
                    </div>
                    <h2 className="text-2xl font-serif font-semibold text-gray-900">
                      Growth & Discovery
                    </h2>
                  </div>

                  <div className="prose max-w-none text-gray-700 space-y-4">
                    <p>
                      As she grew older and went to university, that love for
                      beauty followed her. She began styling other students&apos;
                      hair, sometimes occasionally, sometimes during holidays.
                      Each time, her confidence and skill continued to grow.
                    </p>
                    <p>
                      In 2025, during her internship, her supervisor,{" "}
                      <span className="font-semibold text-lilac-700">
                        Mr Patrick Moore
                      </span>
                      , believed in her gift and encouraged her to pursue and
                      use what the Living God had placed in her hands. Those
                      words became a turning point. Tshedy took time to reflect,
                      pray, and take her passion seriously.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Images & Launch */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-rosegold-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-linear-to-br from-rosegold-400 to-blush-400 rounded-full flex items-center justify-center text-2xl">
                      🎉
                    </div>
                    <h2 className="text-2xl font-serif font-semibold text-gray-900">
                      The Launch
                    </h2>
                  </div>

                  <div className="prose max-w-none text-gray-700 space-y-4">
                    <p>
                      By the grace of the Living God, in December 2025, she
                      stepped out of her comfort zone and officially began her
                      journey. She hired a station in Maseru town at{" "}
                      <span className="font-semibold">
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

                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/CHRISTMAS Lunch 23185BY.JPG"
                      alt="Tshedy styling"
                      width={400}
                      height={400}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/CHRISTMAS Lunch 23171BK.JPG"
                      alt="Beautiful results"
                      width={400}
                      height={400}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="bg-linear-to-br from-blush-50 to-white rounded-3xl p-8 shadow-sm border border-blush-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-linear-to-br from-gold-400 to-rosegold-400 rounded-full flex items-center justify-center text-2xl">
                      ✨
                    </div>
                    <h2 className="text-2xl font-serif font-semibold text-gray-900">
                      Today
                    </h2>
                  </div>

                  <p className="text-gray-700">
                    Today,{" "}
                    <span className="font-semibold text-blush-600">
                      Tshedy&apos;s Beauty Parlour
                    </span>{" "}
                    stands as a faith-driven beauty brand built on passion,
                    growth, and purpose. Tshedy looks forward to becoming one of
                    the leading make-up artists and hairdressers in Lesotho,
                    while glorifying God and helping every client feel beautiful
                    and confident.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 bg-linear-to-r from-blush-100 via-lilac-100 to-rosegold-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-6">
                <div className="w-16 h-16 bg-linear-to-br from-blush-400 via-lilac-400 to-rosegold-400 rounded-full flex items-center justify-center text-3xl mx-auto shadow-lg">
                  🌟
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                Our Vision
              </h2>

              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
                Our vision is to become one of the leading beauty brands in
                Lesotho, known for excellence, creativity, and faith-driven
                service.
              </p>

              <p className="text-gray-600 max-w-3xl mx-auto mb-8">
                We aim to grow into a trusted beauty space that inspires young
                women, creates opportunities, and sets a standard of beauty
                built on purpose, confidence, and grace.
              </p>

              <Link href="/book">
                <Button className="text-lg px-8 py-4">
                  Book Your Appointment
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Gratitude Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 text-center"
            >
              <div className="text-4xl mb-4">🙏🏾💕</div>
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 mb-6">
                With Gratitude
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                She gives thanks to the{" "}
                <span className="font-semibold text-lilac-700">Living God</span>{" "}
                for every step of this journey, to her parents for supporting
                her bold decision, to{" "}
                <span className="font-semibold">Mr Patrick Moore</span> for
                believing in her, and to everyone who continues to support
                Tshedy&apos;s Beauty Parlour.
              </p>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 italic">
                  &quot;Faith, Passion & Purpose — Making Beauty a Blessing ✨&quot;
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-linear-to-br from-blush-50 to-lilac-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Ready to Transform Your Look?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the passion, care, and expertise that makes
              Tshedy&apos;s Beauty Parlour special.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button className="px-8 py-4">Book Now</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-8 py-4">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
