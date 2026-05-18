import { getRatedDoctors } from "@/lib/actions";
import DoctorCard from "@/components/DoctorCard";
import { Award } from "lucide-react";

const TopRatedDoctor = async () => {
  const topDoctors = await getRatedDoctors();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 space-y-10">
      
      <div className="text-center space-y-3 max-w-2xl mx-auto">

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-600/10 dark:bg-cyan-400/10 rounded-full border border-cyan-600/20">
          <Award size={14} className="text-cyan-600 dark:text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Top Rated
          </span>
        </div>
        

        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
          Our Highest Rated Specialists
        </h2>
        

        <p className="text-base text-muted-foreground leading-relaxed">
          Book appointments with our top-tier medical professionals, recognized for their exceptional patient care and clinical excellence.
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {topDoctors.map((doctor) => (
          <DoctorCard key={doctor._id || doctor.id} doctor={doctor} />
        ))}
      </div>
      
    </div>
  );
};

export default TopRatedDoctor;