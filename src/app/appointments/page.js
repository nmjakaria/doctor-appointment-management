'use client';

import { useState, useEffect, useCallback } from "react";
import { Search, SlidersHorizontal, Activity } from "lucide-react";
import DoctorCard from "@/components/DoctorCard";
import { getDoctors } from "@/lib/actions";
import { Button, Input, ListBoxItem, Select, Spinner } from "@heroui/react";

export default function AppointmentsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("all");

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    const data = await getDoctors(search, specialty);
    setDoctors(data);
    setLoading(false);
  }, [search, specialty]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDoctors();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchDoctors]);

  const specialties = [
    { label: "All Specialities", value: "all" },
    { label: "Cardiology", value: "cardiology" },
    { label: "Neurology", value: "neurology" },
    { label: "Dermatology", value: "dermatology" },
    { label: "Orthopedics", value: "orthopedics" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
          <Activity size={16} className="text-blue-600" />
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Specialist Directory</span>
        </div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">Find Your Specialist</h1>
        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
          Book an appointment with leading medical professionals and get the care you deserve.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-6 bg-slate-50 p-8 rounded-[40px] border border-slate-100">
        <div className="flex-grow">
          <Input
            placeholder="Search by name or clinic..."
            startContent={<Search className="text-slate-400" size={20} />}
            value={search}
            onValueChange={setSearch}
            variant="bordered"
            className="rounded-2xl bg-white"
            classNames={{
              inputWrapper: "h-16 border-slate-200 group-data-[focus=true]:border-blue-600 px-6",
              input: "text-lg font-medium"
            }}
          />
        </div>
        <div className="w-full md:w-72">
          <Select
            label="Speciality"
            placeholder="Select speciality"
            className="rounded-2xl bg-white"
            variant="bordered"
            classNames={{
              trigger: "h-16 border-slate-200 group-data-[focus=true]:border-blue-600 px-6",
              label: "font-bold"
            }}
            selectedKeys={[specialty]}
            onSelectionChange={(keys) => setSpecialty(Array.from(keys)[0])}
          >
            {specialties.map((spec) => (
              <ListBoxItem key={spec.value} value={spec.value}>
                {spec.label}
              </ListBoxItem>
            ))}
          </Select>
        </div>
        <Button 
          variant="flat" 
          className="h-16 w-16 min-w-16 rounded-2xl bg-white border border-slate-200"
          isIconOnly
        >
          <SlidersHorizontal size={24} className="text-slate-600" />
        </Button>
      </div>

      <div className="min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <Spinner size="lg" color="primary" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm animate-pulse">Scanning database...</p>
          </div>
        ) : doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-[24px] flex items-center justify-center text-slate-300 mx-auto">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">No specialists found</h3>
            <p className="text-slate-400 max-w-xs mx-auto">Try adjusting your search criteria or changing the speciality filter.</p>
            <Button 
              variant="flat" 
              className="mt-6 font-bold"
              onPress={() => { setSearch(""); setSpecialty("all"); }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
