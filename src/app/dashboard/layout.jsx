import DashboardTabs from '@/components/DashboardTabs';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';


export default async function DashboardLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const user = session?.user;

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      {/* Premium Welcome Header */}
      <div className="bg-card w-full rounded-2xl p-6 text-card-foreground shadow-xl relative overflow-hidden border border-default-100">
        <div className="relative z-10 space-y-2">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Welcome back,
            <span className="text-primary"> {user?.name || "Patient"}</span>
          </h1>
          <p className="text-default-500 text-sm md:text-base leading-relaxed max-w-2xl">
            Your clinical chart is fully synchronized. Review your upcoming doctor consultations, prescriptions, and digital tokens below.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[120px] rounded-full -mr-32 -mt-32" />
      </div>

      <DashboardTabs />

      <div className="w-full">
        {children}
      </div>
    </div>
  );
}