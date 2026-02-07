import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import MagicalSparkles from "./components/MagicalSparkles";
import FloatingShapes from "./components/FloatingShapes";
import ParticleBackground from "./components/ParticleBackground";
import ScrollProgress from "./components/ScrollProgress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "✨ Tshedy's Magical Beauty Parlour - Fantasy Hair & Beauty",
  description: "Experience enchanting beauty treatments at Tshedy's. Where fantasy meets beauty with magical hair styling, mystical braids, and spellbinding treatments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased relative`}
      >
        {/* Magical Background Effects */}
        <MagicalSparkles />
        <FloatingShapes />
        <ParticleBackground />
        <ScrollProgress />
        
        {/* Main Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
