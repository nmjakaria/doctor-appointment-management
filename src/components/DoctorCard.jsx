'use client';

import { Button, Card, CardContent, CardFooter, CardHeader } from "@heroui/react";
import { Star, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DoctorCard({ doctor }) {
  return (
    <Card className="rounded-[32px] border border-default-100 shadow-xl shadow-default-100/5 hover:shadow-2xl hover:border-default-200 transition-all group bg-content1 p-2 max-w-sm">

      <CardHeader className="p-0 overflow-hidden rounded-[24px] relative">
        <Image
          alt={doctor.name}
          className="object-cover w-full h-65 group-hover:scale-105 transition-transform duration-500"
          src={doctor.image}
          width={400}
          height={260}
          priority={false}
        />

        <div className="absolute top-4 right-4 z-10">
          <div className="bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md border border-default-100">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-foreground">{doctor.rating || "4.9"}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-3.5">
        <div className="space-y-1.5">
          <h3 className="text-2xl font-bold text-foreground tracking-tight">{doctor.name}</h3>
          <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
            {doctor.specialty}
          </p>
        </div>
        <p className="text-sm text-muted-foreground/90 leading-relaxed font-normal">
          {doctor.description || "Highly experienced specialist providing patient-centered treatment and preventive care."}
        </p>

        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <MapPin size={16} className="text-default-400" />
            <span className="text-sm font-medium">{doctor.hospital}</span>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Clock size={16} className="text-default-400" />
            <span className="text-sm font-medium">{doctor.experience} experience</span>
          </div>
        </div>
      </CardContent>

      <hr className="border-default-100 mx-5" />

      <CardFooter className="px-5 py-4 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-medium">Consultation</span>
          <span className="text-xl font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-0.5">
            ৳{doctor.fee}
          </span>
        </div>

        <Link href={`/appointments/${doctor._id}`}>
          <Button
            className="h-11 px-6 rounded-xl font-bold text-sm bg-primary text-primary-foreground shadow-md transition-colors"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}