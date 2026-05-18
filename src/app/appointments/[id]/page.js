import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Star, MapPin, Award, Building, DollarSign } from "lucide-react";
import BookingButton from "@/components/BookingButton";
import { getDoctorById } from "@/lib/actions";
import Image from "next/image";
import { Card, CardContent, Chip } from "@heroui/react";

export default async function DoctorDetailsPage({ params }) {
    const { id } = await params;
    const doctor = await getDoctorById(id);

    if (!doctor) {
        return notFound();
    }

    return (
        <div className="max-w-6xl mx-auto pb-20 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left: Image & Quick Stats */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-square">
                        <Image
                            fill
                            src={doctor.image || "https://picsum.photos/seed/doctor/600/600"}
                            alt={doctor.name}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    
                    <Card className="border-none bg-primary/5 p-4">
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                                <p className="text-2xl font-bold text-primary">{doctor.experience}+</p>
                                <p className="text-tiny text-default-500 uppercase font-bold">Years Exp</p>
                            </div>
                            <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                                <p className="text-2xl font-bold text-primary">{doctor.rating}</p>
                                <p className="text-tiny text-default-500 uppercase font-bold">Rating</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Info & Bio */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <Chip color="primary" variant="flat" size="sm" className="font-bold">
                            {doctor.specialty} Specialist
                        </Chip>
                        <h1 className="text-4xl md:text-5xl font-bold">{doctor.name}</h1>
                        <div className="flex items-center gap-6 flex-wrap">
                            <div className="flex items-center gap-2 text-default-600">
                                <Building size={18} className="text-primary" />
                                <span className="font-medium">{doctor.hospital}</span>
                            </div>
                            <div className="flex items-center gap-2 text-default-600">
                                <MapPin size={18} className="text-primary" />
                                <span className="font-medium">{doctor.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* <Divider /> */}

                    <div className="space-y-4 text-lg text-default-600 leading-relaxed">
                        <h3 className="text-2xl font-bold text-foreground">About Doctor</h3>
                        <p>{doctor.description || "Expert medical professional dedicated to providing high-quality care to patients. With years of experience in the field, Dr. " + doctor.name.split(' ').pop() + " has assisted thousands of patients with their complex medical needs."}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-none bg-default-50 shadow-none p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-primary">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <p className="font-bold">Education</p>
                                    <p className="text-sm text-default-500">Harvard Medical School, MD</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="border-none bg-default-50 shadow-none p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-primary">
                                    <DollarSign size={24} />
                                </div>
                                <div>
                                    <p className="font-bold">Consultation Fee</p>
                                    <p className="text-sm text-default-500">${doctor.fee} per session</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="pt-6">
                        <Suspense fallback={<div>Loading booking options...</div>}>
                            <BookingButton doctor={JSON.parse(JSON.stringify(doctor))} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
