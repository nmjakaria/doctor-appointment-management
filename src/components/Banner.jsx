'use client';

import { Button } from "@heroui/react";
import { CalendarDays, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// 💡 Embla Carousel এবং Autoplay প্লাগইন ইম্পোর্ট করুন
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const sliderImages = [
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80"
];

export default function Banner() {
  // 💡 Embla হুক কনফিগারেশন (৪ সেকেন্ড পর পর অটো-প্লে হবে এবং লুপ চলবে)
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">

      <div className="relative overflow-hidden rounded-[40px] bg-linear-to-br from-cyan-600/10 via-background to-primary/5 border border-cyan-600/10 p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-2xl shadow-cyan-600/5">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* বাম দিকের কন্টেন্ট সেকশন */}
        <div className="flex-1 space-y-6 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-600/10 dark:bg-cyan-400/10 rounded-full border border-cyan-600/20 w-fit">
            <CheckCircle2 size={14} className="text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Your Health, Our Priority
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
            Find & Book <br />
            <span className="bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
              Top Specialists
            </span> <br />
            In Your Area
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed mx-auto lg:mx-0">
            Skip the waiting room. Access verified profiles of leading doctors, read patient reviews, and schedule your appointment effortlessly online within minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Link
            href="/appointments"
            >
              <Button
                size="lg"
                className="h-14 px-8 rounded-2xl font-black text-base bg-primary text-primary-foreground hover:bg-cyan-700 shadow-xl shadow-primary/20 group w-full sm:w-auto transition-all"
                endContent={<ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              >
                Book Appointment
              </Button>
            </Link>

            <Button
              as={Link}
              href="#how-it-works"
              size="lg"
              variant="bordered"
              className="h-14 px-8 rounded-2xl font-bold text-base border-default-200 text-foreground hover:bg-default-100 w-full sm:w-auto"
              startContent={<CalendarDays size={18} className="text-default-400" />}
            >
              See How It Works
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-default-100 max-w-md mx-auto lg:mx-0">
            <div>
              <p className="text-2xl font-black text-foreground">500+</p>
              <p className="text-xs text-muted-foreground font-semibold">Expert Doctors</p>
            </div>
            <div>
              <p className="text-2xl font-black text-foreground">20k+</p>
              <p className="text-xs text-muted-foreground font-semibold">Happy Patients</p>
            </div>
            <div>
              <p className="text-2xl font-black text-foreground">4.9/5</p>
              <p className="text-xs text-muted-foreground font-semibold">Average Rating</p>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md lg:max-w-none relative z-10 group">

          <div className="overflow-hidden rounded-[32px] border-4 border-background shadow-2xl bg-muted" ref={emblaRef}>

            <div className="flex h-80 sm:h-100">
              {sliderImages.map((src, index) => (
                <div className="flex-[0_0_100%] min-w-0 relative" key={src}>
                  <Image
                    alt={`Healthcare Professionals - ${index + 1}`}
                    src={src}
                    fill
                    priority={index === 0}
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-w-7xl) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 rounded-[32px] bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none border-4 border-transparent" />

          <div className="absolute -bottom-5 -left-5 bg-background border border-default-100 shadow-2xl rounded-2xl p-4 flex items-center gap-3 sm:flex animate-bounce-slow">
            <div className="w-10 h-10 bg-cyan-600/10 rounded-xl flex items-center justify-center text-cyan-600">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-sm font-black text-foreground">100% Verified</p>
              <p className="text-xs text-muted-foreground font-medium">Medical Profiles</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}