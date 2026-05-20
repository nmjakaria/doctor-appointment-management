import Banner from "@/components/Banner";
import MedicalPartners from "@/components/MedicalPartners";
import Specialties from "@/components/Specialties";
import TopRatedDoctor from "@/components/TopRatedDoctor";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <TopRatedDoctor />
      <Specialties />
      <WhyChooseUs />
      <MedicalPartners />
    </div>
  );
}
