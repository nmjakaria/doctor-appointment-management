import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Star, MapPin, Award, Building, DollarSign, Clock } from "lucide-react";
import BookingButton from "@/components/BookingButton";
import { getDoctorById } from "@/lib/actions";
import Image from "next/image";
import { Card, CardContent, Chip } from "@heroui/react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TbCurrencyTaka } from "react-icons/tb";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const reqHeaders = await headers();
    const tokenData = await auth.api.getToken({
        headers: reqHeaders
    });
    
    const token = tokenData?.token;
    const doctor = await getDoctorById(id, token);

    if (!doctor) {
        return {
            title: "Doctor Not Found | DocAppoint",
            description: "The requested doctor profile is unavailable or does not exist.",
        };
    }

    return {
        title: `${doctor.name} - ${doctor.specialty}`,
        description: `Book an appointment with ${doctor.name} (${doctor.specialty}) at ${doctor.hospital || "our affiliated hospital"}. Experience: ${doctor.experience}.`,
    };
}

export default async function DoctorDetailsPage({ params }) {
    const { id } = await params;
    
    // Get token
    const { token } = await auth.api.getToken({
        headers: await headers()
    });
    const doctor = await getDoctorById(id, token);

    if (!doctor) {
        throw new Error("We couldn't retrieve the doctor's details. The profile might be hidden, deleted, or the link is invalid.");
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                
                <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-6">
                    <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-square w-full">
                        <Image
                            fill
                            src={doctor.image || "https://picsum.photos/seed/doctor/600/600"}
                            alt={doctor.name}
                            className="object-cover w-full h-full"
                            priority
                        />
                    </div>

                    <Card className="border-none bg-primary/5 p-2 shadow-none">
                        <CardContent className="grid grid-cols-2 gap-4 p-2">
                            <div className="text-center p-4 bg-background rounded-2xl shadow-sm">
                                <p className="text-2xl font-bold text-primary">{doctor.experience}+</p>
                                <p className="text-tiny text-default-500 uppercase font-bold tracking-wider">Years Exp</p>
                            </div>
                            <div className="text-center p-4 bg-background rounded-2xl shadow-sm">
                                <div className="flex items-center justify-center gap-1">
                                    <Star size={18} className="fill-warning text-warning" />
                                    <p className="text-2xl font-bold text-foreground">{doctor.rating}</p>
                                </div>
                                <p className="text-tiny text-default-500 uppercase font-bold tracking-wider">Rating</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <Chip color="primary" variant="flat" size="md" className="font-bold px-3 py-1">
                            {doctor.specialty} Specialist
                        </Chip>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
                            {doctor.name}
                        </h1>
                        <div className="flex items-center gap-6 flex-wrap text-default-600">
                            <div className="flex items-center gap-2">
                                <Building size={18} className="text-primary" />
                                <span className="font-medium text-sm md:text-base">{doctor.hospital}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={18} className="text-primary" />
                                <span className="font-medium text-sm md:text-base">{doctor.location}</span>
                            </div>
                        </div>
                    </div>

                    <hr className="border-default-100" />

                    <div className="space-y-3">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">About Doctor</h3>
                        <p className="text-base md:text-lg text-default-600 leading-relaxed">
                            {doctor.description || `Expert medical professional dedicated to providing high-quality care to patients. With years of experience in the field, Dr. ${doctor.name.split(' ').pop()} has assisted thousands of patients with their complex medical needs.`}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border border-default-100 bg-default-50/50 shadow-none p-5 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-background rounded-xl shadow-sm text-primary">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">Education</p>
                                    <p className="text-sm text-default-500 font-medium">Harvard Medical School, MD</p>
                                </div>
                            </div>
                        </Card>
                        
                        <Card className="border border-default-100 bg-default-50/50 shadow-none p-5 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-background rounded-xl shadow-sm text-success">
                                    <TbCurrencyTaka size={24}/>
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">Consultation Fee</p>
                                    <p className="text-sm text-default-500 font-medium">৳ {doctor.fee} per session</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <hr className="border-default-100" />

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-foreground">
                            <Clock size={20} className="text-primary" />
                            <h3 className="text-xl font-bold">Available Timeslots</h3>
                        </div>
                        
                        {doctor.availability && doctor.availability.length > 0 ? (
                            <div className="flex flex-wrap gap-2.5">
                                {doctor.availability.map((time, index) => (
                                    <Chip 
                                        key={index} 
                                        variant="bordered" 
                                        color="default" 
                                        className="border-primary text-accent-foreground font-medium px-3 py-2 text-sm rounded-xl bg-accent"
                                    >
                                        {time}
                                    </Chip>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-default-400 italic">No available timeslots listed for today.</p>
                        )}
                    </div>

                    {/* বুকিং বাটন অ্যাকশন */}
                    <div className="pt-4">
                        <Suspense fallback={<div className="text-default-400 animate-pulse font-medium">Loading booking options...</div>}>
                            <BookingButton doctor={JSON.parse(JSON.stringify(doctor))} />
                        </Suspense>
                    </div>

                </div>
            </div>
        </div>
    );
}