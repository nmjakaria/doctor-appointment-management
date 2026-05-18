'use client';

import { useState, useEffect, useCallback } from "react";
import { 
  Tabs, Tab, Card, Button, Avatar, 
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Chip, Spinner,
  CardContent
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  Calendar, Clock, User, FileText, 
  Settings, CreditCard, ChevronRight, Activity,
  Stethoscope, MessageSquare
} from "lucide-react";


export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const fetchAppointments = useCallback(async () => {
    try {
      // Mocked for now, would be a real API call
      setTimeout(() => {
        setAppointments([
          { id: 1, doctor: "Dr. Sarah Johnson", specialty: "Cardiology", date: "2024-05-20", time: "10:00 AM", status: "confirmed" },
          { id: 2, doctor: "Dr. Michael Chen", specialty: "Neurology", date: "2024-05-22", time: "02:30 PM", status: "pending" },
          { id: 3, doctor: "Dr. Emily Wilson", specialty: "Dermatology", date: "2024-05-15", time: "09:15 AM", status: "completed" },
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Failed to fetch appointments");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.push("/login?callback=/dashboard");
      return;
    }
    
    if (session?.user) {
      setProfileName(session.user.name || "User");
      setProfileImage(session.user.image || `https://i.pravatar.cc/150?u=${session.user.id}`);
      fetchAppointments();
    }
  }, [session, isPending, router, fetchAppointments]);

  if (isPending || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Spinner size="lg" color="primary" />
        <p className="text-slate-500 font-medium animate-pulse">Synchronizing clinical data...</p>
      </div>
    );
  }

  const getStatusChip = (status) => {
    switch (status) {
      case "confirmed": return <Chip color="success" variant="flat" size="sm" className="font-bold">Confirmed</Chip>;
      case "pending": return <Chip color="warning" variant="flat" size="sm" className="font-bold">Pending</Chip>;
      case "completed": return <Chip color="default" variant="flat" size="sm" className="font-bold text-slate-400">Completed</Chip>;
      default: return <Chip size="sm">{status}</Chip>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900 rounded-[40px] p-8 md:p-12 text-white shadow-2xl overflow-hidden relative">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
            <Activity size={16} className="text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-100">Health Overview</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Welcome back, <br/>
            <span className="text-blue-400">{profileName}</span>
          </h1>
          <p className="text-slate-400 max-w-md text-lg leading-relaxed">
            You have 2 appointments scheduled for this week. Keep up with your health goals!
          </p>
        </div>
        
        <div className="hidden md:flex relative z-10">
          <Avatar 
            src={profileImage}
            className="w-32 h-32 rounded-[32px] border-4 border-white/10 shadow-2xl"
          />
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
          </div>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full -ml-32 -mb-32" />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar Content */}
        <div className="lg:col-span-8 space-y-8">
          <Tabs 
            aria-label="Dashboard options" 
            color="primary" 
            variant="underlined"
            classNames={{
              tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-blue-600",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-blue-600 font-bold"
            }}
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
          >
            <Tab
              key="overview"
              title={
                <div className="flex items-center gap-2">
                  <Activity size={18} />
                  <span>Overview</span>
                </div>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card className="rounded-[32px] border-none shadow-xl shadow-slate-100 bg-white group hover:translate-y-[-4px] transition-all">
                  <CardContent className="p-8 flex flex-row items-center gap-6">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Calendar size={28} />
                    </div>
                    <div>
                      <h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider">Next Appointment</h3>
                      <p className="text-xl font-extrabold text-slate-900">May 20, 10:00 AM</p>
                      <p className="text-slate-500 text-sm font-medium">Dr. Johnson • Cardiology</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-[32px] border-none shadow-xl shadow-slate-100 bg-white group hover:translate-y-[-4px] transition-all">
                  <CardContent className="p-8 flex flex-row items-center gap-6">
                    <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <FileText size={28} />
                    </div>
                    <div>
                      <h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider">Health Records</h3>
                      <p className="text-xl font-extrabold text-slate-900">4 New Updates</p>
                      <p className="text-slate-500 text-sm font-medium">Lab results & Prescription</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-extrabold text-slate-900">Recent Appointments</h2>
                  <Button variant="light" color="primary" className="font-bold" endContent={<ChevronRight size={16} />}>
                    View All
                  </Button>
                </div>
                
                <Card className="rounded-[32px] border border-slate-50 shadow-2xl shadow-slate-100 overflow-hidden">
                  <Table 
                    aria-label="Appointments table" 
                    className="border-none" 
                    removeWrapper
                  >
                    <TableHeader>
                      <TableColumn className="bg-slate-50/50 text-slate-400 font-bold py-4">DOCTOR</TableColumn>
                      <TableColumn className="bg-slate-50/50 text-slate-400 font-bold">DATE & TIME</TableColumn>
                      <TableColumn className="bg-slate-50/50 text-slate-400 font-bold">STATUS</TableColumn>
                      <TableColumn className="bg-slate-50/50 text-slate-400 font-bold text-right pr-6">ACTION</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((apt) => (
                        <TableRow key={apt.id} className="border-b border-slate-50 last:border-none hover:bg-slate-50/30 transition-colors">
                          <TableCell className="py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                                <Stethoscope size={20} />
                              </div>
                              <div>
                                <p className="font-bold text-slate-900">{apt.doctor}</p>
                                <p className="text-xs text-slate-400 font-medium">{apt.specialty}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-bold text-slate-700">{apt.date}</p>
                              <p className="text-xs text-slate-400 flex items-center gap-1">
                                <Clock size={12} /> {apt.time}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusChip(apt.status)}</TableCell>
                          <TableCell className="text-right pr-6">
                            <Button size="sm" variant="flat" className="font-bold rounded-lg px-4">Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </Tab>
            <Tab
              key="records"
              title={
                <div className="flex items-center gap-2">
                  <FileText size={18} />
                  <span>Records</span>
                </div>
              }
            >
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto">
                  <FileText size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Medical Records Securely Stored</h3>
                <p className="text-slate-400 max-w-sm mx-auto">Your health records are encrypted and only accessible by you and authorized healthcare providers.</p>
                <Button color="primary" variant="flat" className="font-bold mt-4">Upload New Record</Button>
              </div>
            </Tab>
          </Tabs>
        </div>

        {/* Right Sidebar - Support & Quick Actions */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[32px] border-none bg-blue-600 text-white p-2">
            <CardContent className="p-8 space-y-6">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <MessageSquare size={24} />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold tracking-tight">Need Medical Advice?</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Start a chat with our health assistant or schedule a virtual consultation with a general practitioner.
                </p>
                <Button className="w-full bg-white text-blue-600 font-bold h-12 rounded-xl">
                  Message assistant
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 px-2 textValue='Quick Actions'">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { icon: Stethoscope, label: "Find a Doctor", color: "text-blue-600", bg: "bg-blue-50" },
                { icon: CreditCard, label: "Billing & Invoices", color: "text-green-600", bg: "bg-green-50" },
                { icon: Settings, label: "Profile Settings", color: "text-slate-600", bg: "bg-slate-50" },
              ].map((action, i) => (
                <Button 
                  key={i}
                  variant="flat" 
                  className="w-full h-16 justify-start px-6 rounded-2xl bg-white border border-slate-50 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all"
                >
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mr-4", action.bg, action.color)}>
                    <action.icon size={20} />
                  </div>
                  <span className="font-bold text-slate-700">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
