import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Tshedy's Beauty Parlour - Premium Beauty Services",
  description: "Experience luxury beauty treatments at Tshedy's Beauty Parlour. Professional hairstyling, treatments, and beauty services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dancing.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
