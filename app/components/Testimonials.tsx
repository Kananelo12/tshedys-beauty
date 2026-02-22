"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Quote } from "lucide-react";
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
  onImageClick,
}: {
  testimonial: Testimonial;
  onImageClick: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedContent = testimonial.content.slice(0, 180);
  const needsTruncation = testimonial.content.length > 180;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col h-full">
      {/* Quote Icon */}
      <Quote size={20} className="text-pink-200 mb-4 shrink-0" />

      {/* Content */}
      <div className="flex-1 mb-5">
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
          {isExpanded ? testimonial.content : truncatedContent}
          {!isExpanded && needsTruncation && "..."}
        </p>
        {needsTruncation && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-pink-500 hover:text-pink-600 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
          >
            {isExpanded ? (
              <>Less <ChevronUp size={14} /></>
            ) : (
              <>More <ChevronDown size={14} /></>
            )}
          </button>
        )}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
        <div
          className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer shrink-0 ring-2 ring-pink-100"
          onClick={onImageClick}
        >
          <Image
            src={`/${testimonial.image}`}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
          <p className="text-xs text-gray-400">Client</p>
        </div>
      </div>
    </div>
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
    <section id="testimonials" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-600 mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-base text-gray-500 max-w-lg mx-auto">
            Real stories from the women who trust us with their beauty
          </p>
        </div>

        {/* Grid Layout — horizontal scroll on mobile, grid on sm+ */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 sm:overflow-visible">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="min-w-[80vw] snap-start sm:min-w-0">
              <TestimonialCard
                testimonial={testimonial}
                onImageClick={() => openLightbox(index)}
              />
            </div>
          ))}
        </div>
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
