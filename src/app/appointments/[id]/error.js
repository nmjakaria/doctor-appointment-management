"use client";

import { Button } from "@heroui/react";
import { AlertTriangle, RefreshCw, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Next.js error component রিসিভ করে error অবজেক্ট এবং reset ফাংশন
const DoctorErrorPage = ({ error, reset }) => {
    const router = useRouter();

    useEffect(() => {
        // আপনি চাইলে এখানে লগে এররটি ট্র্যাক করতে পারেন
        console.error("Doctor Details Error:", error);
    }, [error]);

    return (
        <div className="min-h-[75vh] w-full flex flex-col items-center justify-center px-4 text-center">
            {/* মডার্ন পালস বা গ্লো ইফেক্ট */}
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full scale-150" />
                <div className="relative grid h-24 w-24 place-items-center rounded-2xl bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400 mx-auto">
                    <AlertTriangle className="size-12 stroke-[1.5] animate-bounce" />
                </div>
            </div>

            {/* এরর মেসেজ হেডিং */}
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                Doctor Profile Unavailable
            </h1>
            
            {/* ডাইনামিক এরর মেসেজ (ডাটাবেস বা ব্যাকএন্ড থেকে যা আসবে) */}
            <p className="mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">
                {error?.message || "We couldn't retrieve the doctor's details. The profile might be hidden, deleted, or the link is invalid."}
            </p>

            {/* অ্যাকশন বাটনসমূহ */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:justify-center">
                {/* আবার ট্রাই করার বাটন */}
                <Button
                    variant="flat"
                    className="font-medium gap-2 rounded-xl h-11 border border-amber-100 dark:border-amber-900/30"
                    onClick={() => reset()}
                >
                    <RefreshCw className="size-4" />
                    Try Again
                </Button>
                
                {/* অন্য ডাক্তার খোঁজার জন্য ব্যাক বাটন */}
                <Button
                    color="primary"
                    className="font-medium gap-2 rounded-xl h-11 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => router.push("/appointments")} // আপনার অল ডক্টরস/অ্যাপয়েন্টমেন্ট পেজের রুট
                >
                    <Search className="size-4" />
                    Find Other Doctors
                </Button>
            </div>
        </div>
    );
};

export default DoctorErrorPage;