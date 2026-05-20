import AppointmentBooked from '@/components/AppointmentBooked';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Activity } from 'lucide-react';

export const metadata = {
  title: "My Bookings | Dashboard",
};

export default async function MyBookingPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const user = session?.user;
  const { token } = await auth.api.getToken({
    headers: await headers()
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  const bookings = await res.json();

  return (
    <div className="pt-4 space-y-4 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between pl-2">
        <div>
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">Active Consultations</h2>
          <p className="text-xs text-default-500 font-medium mt-0.5">Your currently scheduled digital medical charts</p>
        </div>
        <div className="w-8 h-8 bg-default-100 rounded-lg flex items-center justify-center text-default-500">
          <Activity size={16} className="animate-pulse text-primary" />
        </div>
      </div>

      <AppointmentBooked bookings={bookings} />
    </div>
  );
}