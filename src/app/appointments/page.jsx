'use client';

import { useState, useEffect, useCallback } from "react";
import { Search, SlidersHorizontal, Activity } from "lucide-react";
import DoctorCard from "@/components/DoctorCard";
import { getDoctors } from "@/lib/actions";
import { Button, Input, Label, ListBox, Select, Spinner } from "@heroui/react";

export default function AppointmentsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("all");

  // default filter
  const [allSpecialties, setAllSpecialties] = useState([
    { label: "All Specialities", value: "all" }
  ]);

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    // filter data from backend
    const { doctors, specialties } = await getDoctors(search, specialty);

    setDoctors(doctors);
    if (specialties && specialties.length > 1) {
      setAllSpecialties(specialties);
    }
    setLoading(false);
  }, [search, specialty]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDoctors();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchDoctors]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
          <Activity size={16} className="text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Specialist Directory
          </span>
        </div>
        <h1 className="text-5xl font-black tracking-tight text-foreground">
          Find Your Specialist
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Book an appointment with leading medical professionals and get the care you deserve.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-2 justify-center items-end bg-content1 p-3 rounded-xl border border-default-100 bg-primary/10 shadow-sm w-full">
        {/* Search Doctor Input */}
        <div className="grow w-full flex flex-col gap-2">
          <h2 className="text-base font-bold text-foreground/90 pl-1">
            Search Doctor
          </h2>
          <Input
            placeholder="Search by name or clinic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outline"
            className="h-16 w-full rounded-2xl border border-default-200 bg-background px-5 text-base font-medium text-foreground placeholder:text-default-400 outline-none focus-within:border-primary transition-colors"
          />
        </div>

        {/* Dynamic Specialty Select */}
        <div className="w-full md:w-100 flex flex-col gap-2">
          <Select
            className="w-full flex flex-col gap-2"
            placeholder="Select speciality"
            selectedKey={specialty}
            onSelectionChange={(key) => setSpecialty(key)}
          >
            <Label className="text-base font-bold text-foreground/90 pl-1">Speciality</Label>

            <Select.Trigger className="h-16 w-full flex items-center justify-between rounded-2xl border border-default-200 bg-background data-[focus=true]:border-primary px-5 text-foreground font-medium text-base transition-colors">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover className="bg-content1 border border-default-100 rounded-2xl shadow-xl p-1">
              <ListBox className="text-foreground outline-none">
                {allSpecialties.map((spec) => (
                  <ListBox.Item
                    key={spec.value}
                    id={spec.value}
                    textValue={spec.label}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm cursor-pointer data-[focused=true]:bg-default-100 data-[selected=true]:text-primary data-[selected=true]:font-bold outline-none"
                  >
                    {spec.label}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>

      {/* Results Container */}
      <div className="min-h-100">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <Spinner size="lg" color="primary" />
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm animate-pulse">
              Scanning database...
            </p>
          </div>
        ) : doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 space-y-4">
            <div className="w-20 h-20 bg-content2 rounded-[24px] flex items-center justify-center text-default-300 mx-auto">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-black text-foreground">No specialists found</h3>
            <p className="text-muted-foreground max-w-xs mx-auto">
              Try adjusting your search or changing the speciality filter.
            </p>
            <Button
              variant="flat"
              color="default"
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