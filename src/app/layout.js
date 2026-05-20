import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./provider";
import { Toaster } from "react-hot-toast";
import ReactLenis from "lenis/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "DocAppoint - Smart Doctor Appointment Manager",
    template: "%s | DocAppoint",
  },
  description: "Book appointments with top-rated verified medical specialists and manage your healthcare schedule seamlessly.",
  keywords: ["doctor appointment", "healthcare", "book doctor", "medical specialist", "DocAppoint"],
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          <ReactLenis root options={{ duration: 1.5, lerp: 0.05 }}>
            {children}
          </ReactLenis>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}