import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import ScrollAnimations from "./components/ScrollAnimations";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RParking – Smart Parking Management System",
  description:
    "Complete automated parking management system with advanced access control, payment processing, and real-time analytics for modern facilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${manrope.variable} ${inter.variable} antialiased`}
    >
      <body className={`min-h-screen ${inter.className}`}>
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}
