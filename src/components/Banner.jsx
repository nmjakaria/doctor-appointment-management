'use client';

import { Button, Separator } from "@heroui/react";
import { CalendarDays, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const sliderImages = [
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80"
];

export default function Banner() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
      
      <div className="relative overflow-hidden rounded-[40px] h-[650px] md:h-[600px] flex flex-col justify-between p-8 md:p-12 lg:p-16 shadow-2xl text-white">
        
        <div className="absolute inset-0 w-full h-full -z-10" ref={emblaRef}>
          <div className="flex h-full w-full">
            {sliderImages.map((src, index) => (
              <div className="flex-[0_0_100%] min-w-0 relative h-full w-full" key={src}>
                <Image
                  alt={`Healthcare Background - ${index + 1}`}
                  src={src}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute inset-0 bg-black/50 bg-linear-to-r from-black/40 via-black/20 to-transparent -z-10 pointer-events-none" />


        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-6 text-center lg:text-left z-10 max-w-2xl mt-auto lg:mt-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-400/20 rounded-full border border-cyan-400/30 w-fit backdrop-blur-md mx-auto lg:mx-0">
            <CheckCircle2 size={14} className="text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Your Health, Our Priority
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] drop-shadow-xl text-white">
            Find & Book <br />
            <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Top Specialists
            </span> <br />
            In Your Area
          </h1>

          <p className="text-base sm:text-lg text-gray-200 max-w-xl leading-relaxed mx-auto lg:mx-0 drop-shadow-md">
            Skip the waiting room. Access verified profiles of leading doctors, read patient reviews, and schedule your appointment effortlessly online within minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Link href="/appointments" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-14 px-8 rounded-2xl font-black text-base bg-cyan-600 text-white hover:bg-cyan-500 shadow-xl shadow-cyan-600/30 group w-full sm:w-auto transition-all border border-cyan-500/30"
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
              className="h-14 px-8 rounded-2xl font-bold text-base border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm w-full sm:w-auto transition-all"
              startContent={<CalendarDays size={18} className="text-cyan-300" />}
            >
              See How It Works
            </Button>
          </div>
        </div>


        <div className="mt-8 lg:mt-auto flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10 z-10 w-full backdrop-blur-xs bg-black/10 p-4 rounded-3xl lg:bg-transparent lg:border-t lg:p-0 lg:backdrop-blur-none">
          <div className="grid grid-cols-3 gap-6 sm:gap-12 text-center sm:text-left w-full sm:w-auto">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">500+</p>
              <p className="text-xs text-cyan-200 font-semibold tracking-wide uppercase">Expert Doctors</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">20k+</p>
              <p className="text-xs text-cyan-200 font-semibold tracking-wide uppercase">Happy Patients</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">4.9/5</p>
              <p className="text-xs text-cyan-200 font-semibold tracking-wide uppercase">Average Rating</p>
            </div>
          </div>
          <div className="bg-white/10 dark:bg-zinc-900/40 border border-white/20 shadow-2xl backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-300">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-sm font-black text-white">100% Verified</p>
              <p className="text-xs text-gray-300 font-medium">Medical Profiles</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}