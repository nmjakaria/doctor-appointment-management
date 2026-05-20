import { auth } from '@/lib/auth';
import { Card, CardHeader, CardFooter, CardContent } from '@heroui/react';
import { headers } from 'next/headers';
import Image from 'next/image';
import { Heart, User as UserIcon, Activity, Flame } from 'lucide-react';
import UpdateUserProfile from '@/components/UpdateUserProfile';

export const metadata = {
  title: "My Profile | Dashboard",
};

export default async function MyProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const user = session?.user;

  const patientVitals = [
    { label: "Blood Group", value: "O+", icon: <Heart size={14} className="text-rose-500" /> },
    { label: "Age", value: "24 Yrs", icon: <Activity size={14} className="text-blue-500" /> },
    { label: "Weight", value: "68 Kg", icon: <Flame size={14} className="text-amber-500" /> }
  ];

  return (
    <div className="pt-6 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Card className="rounded-[24px] border border-primary shadow-xl shadow-default-100/50 bg-secondary/50 overflow-hidden">
        
        <div className="h-28 bg-linear-to-t from-accent to-primary relative">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
        </div>

        <CardHeader className="flex flex-col items-center justify-center -mt-16 pb-4 relative z-10">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-background shadow-xl bg-background">
            <Image
              alt='user-profile'
              src={user?.image || "https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197908.png"}
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-6 pt-0">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-black text-foreground tracking-tight">{user?.name || "Patient Name"}</h2>
            <p className="text-xs font-semibold text-default-400 bg-default-100 px-2.5 py-1 rounded-full inline-block">
              {user?.email || "patient@example.com"}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {patientVitals.map((vital, index) => (
              <div 
                key={index} 
                className="p-3 bg-default-50/60 rounded-xl text-center border border-default-100/60 flex flex-col items-center justify-center gap-1.5 transition-all hover:bg-default-100/50"
              >
                <div className="p-1.5 bg-background rounded-lg shadow-sm border border-default-100">
                  {vital.icon}
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-default-400">{vital.label}</p>
                  <p className="text-sm font-black text-foreground">{vital.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-3 text-sm border-t border-default-100">
            <div className="flex justify-between items-center text-default-500">
              <span className="flex items-center gap-2 font-medium">
                <UserIcon size={16} className="text-default-400" /> Patient ID
              </span>
              <span className="font-mono font-bold text-foreground bg-default-100 px-2 py-0.5 rounded-md text-xs"> 
                {user?.id?.slice(-6).toUpperCase() || "001"} 
              </span>
            </div>
            <div className="flex justify-between items-center text-default-500">
              <span className="flex items-center gap-2 font-medium">
                <Heart size={16} className="text-rose-400" /> General Status
              </span>
              <span className="font-bold text-success-600 bg-success-50 dark:bg-success-950/30 px-2.5 py-0.5 rounded-full text-xs">
                Excellent
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pb-6 pt-2 justify-center bg-default-50/30 border-t border-default-100">
          <UpdateUserProfile />
        </CardFooter>
      </Card>
    </div>
  );
}