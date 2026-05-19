import { Card, CardBody, Button, CardContent } from '@heroui/react';
import { Trash2, Edit3, Calendar, Clock, Stethoscope, Hash, CreditCard, ExternalLink } from 'lucide-react';
import React from 'react';
import EditBookedAppointment from './EditBookedAppointment';

const AppointmentBooked = async ({ bookings }) => {
    const appointments = bookings;

    return (
        <div className="space-y-4">
            {appointments.map((apt) => (
                <Card key={apt._id} className="rounded-[24px] border border-slate-100 shadow-xl shadow-card/30 bg-card overflow-hidden hover:border-slate-200/80 transition-all duration-200">
                    <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
                                <Stethoscope size={22} />
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-base font-extrabold text-foreground leading-tight">{apt.
                                        doctorName}</h3>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                        {apt.type || "In-Person Consultation"}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 font-semibold">{apt.specialty}</p>
                                <h3 className="text-base font-extrabold text-foreground leading-tight">Patient: {apt.
                                    patientName}
                                </h3>
                                <p className="text-sm text-foreground/70 font-medium">
                                    {apt.phone}
                                </p>
                                <p className="text-xs text-foreground/70 font-medium bg-background-secondary inline-block px-2.5 py-1 rounded-lg border border-slate-100">
                                    📍 {apt.hospital}, {apt.location}
                                </p>

                                {/* Time & Metadata Badges */}
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-xs text-slate-500 font-semibold border-t border-slate-50 mt-2">
                                    <span className="flex items-center gap-1 text-slate-600">
                                        <Calendar size={13} className="text-blue-500" /> {apt.appointmentDate}
                                    </span>
                                    <span className="flex items-center gap-1 text-slate-600">
                                        <Clock size={13} className="text-blue-500" /> {apt.appointmentTime}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Statuses & Actions */}
                        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                            {/* Payment status badge */}
                            {/* <div className="text-right">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 hidden md:block">Payment</p>
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${apt.paymentStatus === "Paid"
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : "bg-amber-50 text-amber-700 border-amber-200"
                                    }`}>
                                    <CreditCard size={12} />
                                    {apt.paymentStatus}
                                </span>
                            </div> */}

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1.5">
                                <EditBookedAppointment appointment={apt} />
                                <Button isIconOnly size="sm" variant="flat" color="danger" className="rounded-xl w-9 h-9 bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-200 transition-all text-slate-600 hover:text-rose-600">
                                    <Trash2 size={15} />
                                </Button>
                                <Button size="sm" variant="solid" color="primary" className="rounded-xl font-bold h-9 ml-1 shadow-md shadow-blue-500/10" endContent={<ExternalLink size={12} />}>
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