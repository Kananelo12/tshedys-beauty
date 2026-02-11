"use client";

import { useState } from "react";
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

  // Truncate to approximately 4-5 lines (about 200 characters)
  const truncatedContent = testimonial.content.slice(0, 200);
  const needsTruncation = testimonial.content.length > 200;

  return (
    <div className="shrink-0 w-80 md:w-96 bg-white border-2 border-pink-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-pink-300 cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={onImageClick}
        >
          <Image
            src={`/${testimonial.image}`}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        <div>
          <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
          <p className="text-sm text-pink-600">Verified Client</p>
        </div>
      </div>

      {/* Testimonial Content */}
      <div className="relative">
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
          {isExpanded ? testimonial.content : truncatedContent}
          {!isExpanded && needsTruncation && "..."}
        </p>

        {needsTruncation && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-pink-600 hover:text-pink-700 text-sm font-semibold inline-flex items-center gap-1 transition-colors"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp size={16} />
              </>
            ) : (
              <>
                Read More <ChevronDown size={16} />
              </>
            )}
          </button>
        )}
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
    <section id="testimonials" className="py-16 bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-gray-600">
            Hear what our amazing clients have to say
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto scrollbar-hide pb-4">
          <div className="flex gap-6" style={{ width: 'max-content' }}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                onImageClick={() => openLightbox(index)}
              />
            ))}
          </div>
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

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
