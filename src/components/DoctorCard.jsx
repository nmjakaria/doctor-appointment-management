'use client';

import { Button, Card, CardContent, CardFooter, CardHeader } from "@heroui/react";
import { Star, MapPin, Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function DoctorCard({ doctor }) {
  return (
    <Card className="rounded-[40px] border-none shadow-xl shadow-slate-100 hover:shadow-2xl transition-all group bg-white p-2">
      <CardHeader className="p-0 overflow-hidden rounded-[32px] relative">
        <Image
          alt={doctor.name}
          className="object-cover w-full h-[240px] group-hover:scale-110 transition-transform duration-700"
          src={doctor.image}
        />
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-1.5 shadow-lg">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="font-black text-slate-900">{doctor.rating}</span>
            <span className="text-xs text-slate-400 font-bold">({doctor.reviews})</span>
          </div>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg">
            <ShieldCheck size={20} />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">{doctor.specialty}</span>
            <span className="text-lg font-black text-slate-900">${doctor.price}</span>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{doctor.name}</h3>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin size={16} />
            <span className="text-sm font-bold">{doctor.hospital}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Clock size={16} />
            <span className="text-xs font-medium uppercase tracking-wider">{doctor.experience} Experience</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0">
        <Button 
          as={Link}
          href={`/appointments/${doctor.id}`}
          color="primary" 
          className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 group"
        >
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
}
