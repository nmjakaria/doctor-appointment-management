'use client';

import { Button, Link } from "@heroui/react";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="relative mb-12">
        <div className="w-32 h-32 bg-red-50 rounded-[40px] flex items-center justify-center text-red-600 shadow-2xl shadow-red-100 animate-float">
          <AlertCircle size={64} strokeWidth={1.5} />
        </div>
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-xl border-4 border-red-50">
          <span className="font-black text-xs">404</span>
        </div>
      </div>
      
      <div className="space-y-4 max-w-lg">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Diagnostics Failed: <br/> Page Not Found
        </h2>
        <p className="text-slate-500 px-8 text-lg font-medium leading-relaxed">
          The clinical data you&apos;re looking for seems to have been misplaced or is no longer available. 
        </p>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <Button 
          as={Link} 
          href="/" 
          size="lg"
          className="bg-slate-900 text-white rounded-2xl px-10 h-16 font-black shadow-2xl shadow-slate-200 group"
          startContent={<ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />}
        >
          Return Home
        </Button>
        <Button 
          as={Link} 
          href="/appointments" 
          size="lg"
          variant="flat"
          className="rounded-2xl px-10 h-16 font-black"
        >
          Find a Doctor
        </Button>
      </div>
    </div>
  );
}
