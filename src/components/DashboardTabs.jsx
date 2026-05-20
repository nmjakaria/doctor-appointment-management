"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDays, UserSquare2 } from 'lucide-react';

export default function DashboardTabs() {
  const pathname = usePathname();

  const getTabClass = (path) => {
    const baseClass = "flex items-center gap-2 px-1 pb-3 border-b-2 font-bold text-base transition-all duration-200 -mb-[2px]";
    const activeClass = "border-primary text-primary";
    const inactiveClass = "border-transparent text-default-500 hover:text-foreground";
    
    return `${baseClass} ${pathname === path ? activeClass : inactiveClass}`;
  };

  return (
    <div className="w-full border-b border-divider flex gap-6 h-12">
      <Link 
        href="/dashboard/my-booking" 
        className={getTabClass('/dashboard/my-booking')}
      >
        <CalendarDays size={18} />
        <span>My Bookings</span>
      </Link>
      
      <Link 
        href="/dashboard/my-profile" 
        className={getTabClass('/dashboard/my-profile')}
      >
        <UserSquare2 size={18} />
        <span>My Profile</span>
      </Link>
    </div>
  );
}