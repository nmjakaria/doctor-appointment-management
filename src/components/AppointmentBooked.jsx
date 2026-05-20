import { Card, CardBody, Button, CardContent } from '@heroui/react';
import { Calendar, Clock, Stethoscope, ExternalLink, User, Phone, MapPin, MessageCircle } from 'lucide-react'; // MessageCircle আইকন আনা হয়েছে
import React from 'react';
import EditBookedAppointment from './EditBookedAppointment';
import DeleteBookedAppointment from './DeleteBookedAppointment';

const AppointmentBooked = async ({ bookings }) => {
    const appointments = bookings;

    if (!appointments || appointments.length === 0) {
        return (
            <div className="text-center py-16 border-2 border-dashed border-default-200 rounded-[24px] p-6 bg-default-50/40">
                <Stethoscope className="mx-auto text-default-300 mb-3 animate-pulse" size={40} />
                <p className="text-default-500 font-bold text-sm">No active consultations found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {appointments.map((apt) => (
                <Card 
                    key={apt._id} 
                    className="rounded-[24px] border border-default-100 shadow-xl shadow-default-100/30 bg-card overflow-hidden hover:border-default-200 hover:shadow-2xl hover:shadow-default-200/40 transition-all duration-300"
                >
                    <CardContent className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                        <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">

                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0 border border-primary/20 shadow-sm shadow-primary/5">
                                <Stethoscope size={22} />
                            </div>
                            
                            <div className="space-y-3 w-full">

                                <div className="space-y-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-lg font-black text-foreground tracking-tight leading-none">
                                            {apt.doctorName}
                                        </h3>
                                        <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400 border border-primary-100/30">
                                            {apt.type || "In-Person"}
                                        </span>
                                    </div>
                                    <p className="text-xs text-default-400 font-bold tracking-wide">{apt.specialty}</p>
                                </div>

                                <div className="p-3 bg-default-50/60 rounded-xl border border-default-100/50 space-y-1.5 max-w-xl">
                                    <div className="flex items-center gap-2 text-sm text-foreground/90 font-bold">
                                        <User size={14} className="text-default-400 shrink-0" />
                                        <span>Patient: <span className="text-foreground font-black">{apt.patientName}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-default-500 font-semibold">
                                        <Phone size={13} className="text-default-400 shrink-0" />
                                        <span>{apt.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-default-500 font-semibold pt-0.5">
                                        <MapPin size={13} className="text-rose-500 shrink-0" />
                                        <span className="line-clamp-1">{apt.hospital}, {apt.location}</span>
                                    </div>

                                    {apt.reason && (
                                        <div className="flex items-start gap-2 text-xs text-default-600 font-semibold pt-1 border-t border-default-200/40 mt-1.5">
                                            <MessageCircle size={13} className="text-primary mt-0.5 shrink-0" />
                                            <p className="line-clamp-2">
                                                <span className="text-default-400 font-bold">Reason:</span> {apt.reason}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-default-500 font-bold">
                                    <span className="flex items-center gap-1.5 bg-default-100/80 px-2.5 py-1 rounded-lg border border-default-200/30 text-default-600">
                                        <Calendar size={13} className="text-blue-500" /> {apt.appointmentDate}
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-default-100/80 px-2.5 py-1 rounded-lg border border-default-200/30 text-default-600">
                                        <Clock size={13} className="text-success-500" /> {apt.appointmentTime}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex sm:flex-row lg:flex-col items-center justify-end gap-2.5 pt-4 lg:pt-0 border-t lg:border-t-0 border-default-100 shrink-0 w-full lg:w-auto">
                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                <EditBookedAppointment appointment={apt} />
                                <DeleteBookedAppointment appointment={apt} />
                                <Button 
                                    size="sm" 
                                    variant="solid" 
                                    color="primary" 
                                    className="rounded-xl font-black text-xs h-9 px-4 shadow-md shadow-primary/20 transition-transform active:scale-95" 
                                    endContent={<ExternalLink size={12} />}
                                >
                                    Slip
                                </Button>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default AppointmentBooked;