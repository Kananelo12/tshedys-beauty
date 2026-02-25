"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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
    <div className="bg-white rounded-2xl border border-cream-200 p-6 sm:p-7 flex flex-col h-full hover:shadow-md transition-shadow duration-300">
      {/* Author — top */}
      <div className="flex items-center gap-3.5 mb-5">
        <div
          className="relative w-12 h-12 rounded-full overflow-hidden cursor-pointer shrink-0 ring-2 ring-pink-100"
          onClick={onImageClick}
        >
          <Image
            src={`/${testimonial.image}`}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
          <p className="text-xs text-pink-400">Happy Client</p>
        </div>
      </div>

      {/* Large Quote Mark */}
      <div className="text-4xl font-serif text-pink-300 leading-none mb-2 select-none">&ldquo;</div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-foreground/60 text-sm leading-relaxed whitespace-pre-line">
          {isExpanded ? testimonial.content : truncatedContent}
          {!isExpanded && needsTruncation && "..."}
        </p>
        {needsTruncation && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2.5 text-pink-500 hover:text-pink-600 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
          >
            {isExpanded ? (
              <>Less <ChevronUp size={14} /></>
            ) : (
              <>Read more <ChevronDown size={14} /></>
            )}
          </button>
        )}
      </div>

      {/* Closing Quote */}
      <div className="text-4xl font-serif text-pink-300 leading-none mt-3 text-right select-none">&rdquo;</div>
    </div>
  );
}

export default function Testimonials() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const testimonialImages = testimonials.map((t) => `/${t.image}`);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  // Track which card is most visible
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToCard = useCallback((index: number) => {
    const card = cardRefs.current[index];
    if (card && scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft = card.offsetLeft - container.offsetLeft - 20;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, []);

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-cream-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-pink-500 mb-5">
            Testimonials
          </h2>
          <p className="text-base text-foreground/50 max-w-md mx-auto leading-relaxed">
            Real stories from the women who trust us with their beauty
          </p>
        </div>

        {/* Horizontal scroll on all screen sizes */}
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 scrollbar-hide">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="w-[85vw] sm:w-100 min-w-[85vw] sm:min-w-100 snap-start shrink-0"
            >
              <TestimonialCard
                testimonial={testimonial}
                onImageClick={() => openLightbox(index)}
              />
            </div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-6 h-2.5 bg-pink-500"
                  : "w-2.5 h-2.5 bg-pink-200 hover:bg-pink-300"
              }`}
            />
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
