"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Sparkles, Heart } from "lucide-react";
import Image from "next/image";
import Lightbox from "./Lightbox";

interface Testimonial {
  image: string;
  content: string;
  name: string;
}

const testimonials: Testimonial[] = [
  {
    image: "testimonial-1.jpeg",
    content:
      "Hey Tshedy, thank you so much for making me feel like a goddess!\nI loved, loved the hairstyle, it was gojas, gojas 😍.\nThe parting ate down!! The whole hairstyle ate 🔥 everything was just perfect.\nAnd the compliments? 🙌🏾🔥 They kept coming!\nThank you for also making part of my dream come true, being a hair model 🫂💕.\nI felt confident, beautiful, and so appreciated.",
    name: "Litsoanelo",
  },
  {
    image: "testimonial-2.jpeg",
    content:
      "Hey Tšedyy🤭I still have these braids on and they are what six weeks old now!?, but tell you what I can't get over how neat and tight the braids have been.. batho ba Hana hakere ke hairstyle ea December 😂🤞🏽and they still ask na ke loile kae..I just really really love them 🤭i am definitely going to be your return client.",
    name: "Maqobosa Mothobi",
  },
  {
    image: "testimonial-3.jpeg",
    content:
      "My name is Pearl, and I am one of Tshedy's clients.🩷 Every single time she does my braids, the experience is top-tier. From the moment I sit in her chair, I feel welcomed, comfortable, and right at home. Her hospitality is unmatched!\n\nHer braids? Always on point. Never tight, super neat, and beautifully crafted with so much care. You can tell she takes pride in her work. And let's talk about the vibes; Tshedy is fun, warm, and genuinely engaging. She actually listens, laughs with you, and makes the whole experience enjoyable.\n\nShe does my hair with love, patience, and attention to detail, and it shows every time. Hands down, she is one of the best in town!",
    name: "Pearl Limakatso",
  },
  {
    image: "testimonial-4.jpeg",
    content:
      "I looked sooo pretty!\nMy braids were very neat and comfortable, especially considering it was my first experience with jumbo braids. I absolutely loved how light and painless everything felt.\nHape ke ratile hore o khona ho braid le ha moriri o ts'umuhile 😭 that really impressed me. I felt confident, comfortable, and so beautiful.\nThank you for the amazing work and the good vibes 🤍✨",
    name: "Lintle Mpale",
  },
  {
    image: "testimonial-5.jpeg",
    content:
      "I am so obsessed with this hairstyle! 😍\nIt is so well-defined and very neat, honestly the most comfortable hairstyle ever.\nI feel so pretty 🥺😍 and it's all thanks to you. Not just for your blessed hands, but also for being so chill, friendly, and welcoming ❤️\nThe whole experience was amazing, and I left feeling confident and beautiful.",
    name: "Ntshieng",
  },
  {
    image: "testimonial-6.jpeg",
    content:
      "Heyy Tshedy! The way you did my braids made me feel so happy.\nThey are super neat and very comfortable, and they definitely give vibes ✨🔥.\nThank you so much 🤍.",
    name: "Thato Tebele",
  },
];

function TestimonialCard({
  testimonial,
  index,
  onImageClick,
}: {
  testimonial: Testimonial;
  index: number;
  onImageClick: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Truncate to approximately 4-5 lines (about 200 characters)
  const truncatedContent = testimonial.content.slice(0, 200);
  const needsTruncation = testimonial.content.length > 200;

  return (
    <motion.div
      className="relative glass border-2 border-pink-200 rounded-3xl p-6 sm:p-8 group overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
    >
      {/* Animated Background Gradient */}
      <motion.div className="absolute inset-0 bg-linear-to-br from-pink-50 via-blush-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 glow-pink" />

      {/* Content */}
      <div className="relative z-10">
        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className="relative w-16 h-16 rounded-full overflow-hidden border-3 border-pink-300 shadow-lg cursor-pointer group/img"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={onImageClick}
          >
            <Image
              src={`/${testimonial.image}`}
              alt={testimonial.name}
              fill
              className="object-cover group-hover/img:brightness-110 transition-all"
              sizes="64px"
            />
            {/* Click hint overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs">View</span>
            </div>
          </motion.div>

          <div>
            <h3 className="text-xl font-serif font-bold bg-linear-to-r from-pink-700 to-purple-700 bg-clip-text text-transparent">
              {testimonial.name}
            </h3>
            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="text-gold-500"
                >
                  ⭐
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={isExpanded ? "expanded" : "collapsed"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-charcoal-600 text-base leading-relaxed whitespace-pre-wrap"
            >
              {isExpanded
                ? testimonial.content
                : `${truncatedContent}${needsTruncation ? "..." : ""}`}
            </motion.p>
          </AnimatePresence>

          {/* Expand/Collapse Button */}
          {needsTruncation && (
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold transition-colors group/btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{isExpanded ? "Show less" : "Read more"}</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 group-hover/btn:animate-bounce" />
                ) : (
                  <ChevronDown className="w-5 h-5 group-hover/btn:animate-bounce" />
                )}
              </motion.div>
            </motion.button>
          )}
        </div>

        {/* Decorative Hearts */}
        <div className="absolute top-4 right-4 flex gap-1">
          <Heart className="w-4 h-4 text-pink-400 fill-pink-200 animate-pulse" />
          <Sparkles className="w-4 h-4 text-purple-400 animate-sparkle" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const testimonialImages = testimonials.map((t) => `/${t.image}`);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-50 to-transparent opacity-50" />

      {/* Floating Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-pink-300"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-purple-300"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          💜
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 text-gold-400"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ⭐
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold bg-linear-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-6">
            💕 Hear from Our Queens
          </h2>
          <p className="text-lg text-charcoal-600 max-w-3xl mx-auto leading-relaxed">
            Real stories from real people who trusted us with their crowning
            glory. Every review makes our hearts sparkle! ✨
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
              onImageClick={() => openLightbox(index)}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-charcoal-600 text-lg">
            Want to share your experience?
            <span className="ml-2 text-pink-600 font-semibold">
              We&apos;d love to hear from you! 💖
            </span>
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={testimonialImages}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentImageIndex}
          alt="Client photo"
        />
      )}
    </section>
  );
}
