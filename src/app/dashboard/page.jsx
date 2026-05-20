
import AppointmentBooked from '@/components/AppointmentBooked';
import { auth } from '@/lib/auth';
import { Card, CardHeader, CardBody, CardFooter, Button, CardContent } from '@heroui/react';
import { headers } from 'next/headers';
import Image from 'next/image';
import { Activity, ShieldCheck, Heart, User as UserIcon } from 'lucide-react';
import UpdateUserProfile from '@/components/UpdateUserProfile';

export const metadata = {
  title: "Dashboard",
  description: "Track, update schedule slots, or cancel your personal active doctor appointments securely.iew and update your personal account information, profile pictures, and notification preferences.",
};

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const user = session?.user;
  const {token} = await auth.api.getToken({
    headers: await headers()
  });

  const res = await fetch(`${process.env.SERVER_URL}/booking/${user?.id}`,{
    headers:{
      authorization: `Bearer ${token}`
    }
  });
  const bookings = await res.json();


  const patientVitals = [
    { label: "Blood", value: "O+" },
    { label: "Age", value: "24 Yrs" },
    { label: "Weight", value: "68 Kg" }
  ];

  return (
    <div className="container mx-auto py-10 space-y-10">

      {/* Premium Welcome Header */}
      <div className="bg-card w-full rounded-2xl p-2 md:p-6 text-card-foreground shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Welcome back,
            <span className="text-blue-400"> {user?.name || "Patient"}</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Your clinical chart is fully synchronized. Review your upcoming doctor consultations, prescriptions, and digital tokens below.
          </p>
        </div>

        {/* Decorative Background Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[120px] rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Comprehensive Profile Card (Left) */}
        <div className="lg:col-span-4">
          <Card className="rounded-[32px] border border-slate-100 shadow-xl bg-card p-2">
            <CardHeader className="flex flex-col items-center justify-center pt-8 pb-4 relative">
              <div className="relative w-28 h-28 rounded-[32px] overflow-hidden border-4 border-foreground shadow-lg group">
                <Image
                  alt='user-profile'
                  src={user?.image || "https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197908.png"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </CardHeader>

            <CardContent className="space-y-6 px-6">
              <div className="text-center space-y-1">
                <h2 className="text-xl font-extrabold text-foreground tracking-tight">{user?.name || "Meshkat"}</h2>
                <p className="text-xs font-semibold text-foreground/50">{user?.email || "meshkat@example.com"}</p>
              </div>

              {/* Patient Health Vitals Row */}
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl text-center border border-slate-100/50">
                {patientVitals.map((vital, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{vital.label}</p>
                    <p className="text-sm font-extrabold text-slate-700">{vital.value}</p>
                  </div>
                ))}
              </div>

              {/* Account Metadata */}
              <div className="space-y-3 pt-2 text-xs border-t border-slate-100">
                <div className="flex justify-between items-center text-slate-500">
                  <span className="flex items-center gap-1.5"><UserIcon size={14} className="text-slate-400" /> Patient ID</span>
                  <span className="font-mono font-bold text-slate-700"> {user?.id || "001"} </span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span className="flex items-center gap-1.5"><Heart size={14} className="text-rose-400" /> General Status</span>
                  <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">Excellent</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pb-6 pt-4 justify-center">
              <UpdateUserProfile />
            </CardFooter>
          </Card>
        </div>

        {/* Detailed Recent Appointment Section (Right) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between pl-2">
            <div>
              <h2 className="text-xl font-extrabold text-foreground tracking-tight">Active Consultations</h2>
              <p className="text-xs text-foreground/60 font-medium mt-0.5">Your currently scheduled digital medical charts</p>
            </div>
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
              <Activity size={16} className="animate-pulse text-blue-600" />
            </div>
          </div>

          <AppointmentBooked bookings={bookings} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
