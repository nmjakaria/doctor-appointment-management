/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Card, CardContent } from "@heroui/react";
import { Star } from "lucide-react";
import Image from 'next/image';

export default function TestimonialsSection() {
    // Mock patient data with professional English reviews
    const reviews = [
        {
            id: 1,
            name: "Arifur Rahman",
            role: "Software Engineer",
            image: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTGiSRnLzYSrcBkvZ6J6acnbHOqkJXWPkVNrdN_2tUiam3flwmwwOBgT9X0uH9ukQqEAGYJ5_zD2gdwHa4",
            rating: 5,
            comment: "Booking an appointment was incredibly smooth, with absolutely no hassle! I didn't have to wait in long queues at the chamber either. The digital check-in is a game changer."
        },
        {
            id: 2,
            name: "Nusrat Jahan",
            role: "Homemaker",
            image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQ42wvBVVWy-61CgQw2fHur0zy6rY9uSgUcBsJEffdpDnoMR62CItohOVjWv5lmkd-zIoZg2aNWt0DlGaA",
            rating: 5,
            comment: "I needed an urgent pediatrician for my child late at night. Through this app, I managed to secure a prime morning slot within minutes. Outstanding service and user experience!"
        },
        {
            id: 3,
            name: "Dr. Tanvir Ahmed",
            role: "Patient (Cardiology)",
            image: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSmWQhsP7-411f2iho9PvKyjs4D3wYj_0V001BuQeEKb5vsnVGoOeUuN5zOPG9Ur4rf48fz__RAwwjEjl0",
            rating: 4,
            comment: "The comprehensive doctor profiles, verified qualifications, and transparent fee structures made it very easy to find the right specialist. Highly recommend this platform."
        },
        {
            id: 4,
            name: "Farhana Yasmin",
            role: "Bank Officer",
            image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQ-HTQ0cwNw0Kci9FPv6ybxgh9iMLxkQe_1D6seOPyY3ZDhC-YV4B44YaqYQX0lE-kfgobTJNUCA1Ku71c",
            rating: 5,
            comment: "Managing my parents' medical appointments from another city used to be stressful. Now I can track their doctors, timeslots, and pay fees seamlessly online. Super helpful layout."
        },
        {
            id: 5,
            name: "Haji Abdul Karim",
            role: "Retired Government Official",
            image: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRU_G-D_JBk0U01ihFm4oseBH6oxkJRQn5BPdCLPhi8xExRCWMXeBag_Y0FJX-hBQptDqk3VfjYs18fFks",
            rating: 5,
            comment: "At my age, standing in lines at hospitals is painful. This portal makes it direct. The SMS reminder system ensured I didn't miss my medicine advice timings or follow-up days."
        },
        {
            id: 6,
            name: "Zubair Hossain",
            role: "University Student",
            image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&h=400&q=80",
            rating: 4,
            comment: "The UI design is remarkably clean and mobile friendly. Filtering doctors by their specific chamber locations in Dhaka saved me hours of unnecessary traffic commute."
        }
    ];

    return (
        <section className="py-16 bg-background rounded-3xl my-12 px-6 max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    What Our <span className="text-primary">Patients Say</span>
                </h2>
                <p className="text-default-500 text-base md:text-lg">
                    Thousands of patients trust DocAppoint every day for their healthcare needs. Here is what they have to say about their experience.
                </p>
            </div>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <Card
                        key={review.id}
                        isHoverable
                        className="border-none bg-muted shadow-md shadow-default-100 p-2"
                    >
                        <CardContent className="space-y-4 justify-between">
                            {/* Star Ratings and Review Comment */}
                            <div className="space-y-3">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <Star
                                            key={index}
                                            size={16}
                                            className={index < review.rating ? "fill-warning text-warning" : "text-default-300"}
                                        />
                                    ))}
                                </div>
                                <p className="text-default-600 text-sm leading-relaxed italic">
                                    "{review.comment}"
                                </p>
                            </div>

                            {/* Patient Profile (Next.js Image and Info) */}
                            <div className="flex items-center gap-3 pt-4 border-t border-default-100">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                                    <Image
                                        src={review.image}
                                        alt={review.name}
                                        width={40}
                                        height={40}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm text-foreground">{review.name}</span>
                                    <span className="text-tiny text-default-400">{review.role}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}