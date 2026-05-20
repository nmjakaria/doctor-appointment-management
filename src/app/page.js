import Banner from "@/components/Banner";
import MedicalPartners from "@/components/MedicalPartners";
import Specialties from "@/components/Specialties";
import TestimonialsSection from "@/components/TestimonialsSection";
import TopRatedDoctor from "@/components/TopRatedDoctor";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export const metadata = {
  title: "Home | DocAppoint - Your Trusted Healthcare Partner",
  description: "Browse certified medical partners, discover specialties, and find top-rated doctors ready to assist you.",
};

export default function Home() {
  return (
    <div>
      <Banner />
      <TopRatedDoctor />
      <Specialties />
      <WhyChooseUs />
      <TestimonialsSection />
      <MedicalPartners />
    </div>
  );
}
