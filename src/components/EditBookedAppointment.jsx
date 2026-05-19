"use client";
import { useState } from "react";
import { Button, Description, Input, Label, ListBox, Modal, Select, TimeField } from "@heroui/react";
import { Calendar, ChevronDown, Clock, Edit3, Phone, User, Users } from "lucide-react";
import toast from "react-hot-toast";
import { updateAppointment } from "@/lib/actions";


const EditBookedAppointment = ({ appointment }) => {
    const { _id, doctorName: name, patientName: initialPatientName, phone: initialPhone, gender: initialGender, bookingDate: initialBookingDate, appointmentTime: initialAppointmentTime } = appointment;

    // Initialize state hooks for form fields to handle user input dynamically
    const [patientName, setPatientName] = useState(initialPatientName || "");
    const [phone, setPhone] = useState(initialPhone || "");
    const [gender, setGender] = useState(initialGender || "");
    const [bookingDate, setBookingDate] = useState(initialBookingDate || "");
    const [appointmentTime, setAppointmentTime] = useState(initialAppointmentTime || "");

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const result = await updateAppointment(_id, formData);

            if (result.success) {
                toast.success("Appointment Updated Successfully!", {
                    description: "The updated appointment details are now live.",
                });
                window.location.reload();
            } else {
                toast.error(result.error || "Failed to update appointment");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    };

    return (
        <div>
            <Modal>
                <Button isIconOnly size="sm" variant="flat" color="primary" className="rounded-xl w-9 h-9 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-all text-slate-600 hover:text-blue-600">
                    <Edit3 size={15} />
                </Button>

                <Modal.Backdrop className="backdrop-blur-md bg-black/30">
                    <Modal.Container className="max-w-xl mx-auto my-8 p-4">
                        <Modal.Dialog>
                            <Modal.CloseTrigger />

                            <form onSubmit={onSubmit}>
                                <Modal.Header className="p-6 pb-2 flex flex-col gap-1 border-b border-default-100">
                                    <Modal.Heading className="text-2xl font-bold text-foreground">
                                        Edit Appointment
                                    </Modal.Heading>
                                    <p className="text-sm font-normal text-default-500">
                                        Updating details for {name}
                                    </p>
                                </Modal.Header>

                                <Modal.Body className="p-6 gap-6 max-h-[70vh] overflow-y-auto">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">

                                        {/* Patient Name Input */}
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="text-sm font-medium text-foreground pl-0.5">Patient Name</Label>
                                            <div className="flex items-center relative">
                                                <User size={18} className="absolute left-4 text-foreground pointer-events-none z-10" />
                                                <Input
                                                    name="patientName"
                                                    placeholder="Enter full name"
                                                    value={patientName}
                                                    onChange={(e) => setPatientName(e.target.value)}
                                                    required
                                                    className="h-14 w-full rounded-xl border border-default-200 text-sm bg-background pl-11 pr-4 text-foreground placeholder:text-default-400 outline-none focus-within:border-primary transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Phone Number Input */}
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="text-sm font-medium text-foreground pl-0.5">Phone Number</Label>
                                            <div className="flex items-center relative">
                                                <Phone size={18} className="absolute left-4 text-foreground pointer-events-none z-10" />
                                                <Input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="+880 1234-0000"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required
                                                    className="h-14 w-full rounded-xl border border-default-200 bg-background pl-11 pr-4 text-sm text-foreground placeholder:text-foreground outline-none focus-within:border-primary transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Gender Select */}
                                        <div className="w-full flex flex-col gap-2">
                                            <Select
                                                defaultValue={gender}
                                                className="w-full"
                                                name="gender"
                                                // If HeroUI Select supports direct state updates, handle it here:
                                                onSelectionChange={(key) => setGender(key)}
                                            >
                                                <Label className="text-sm font-medium text-foreground pl-0.5">Gender</Label>

                                                <Select.Trigger className="h-14 w-full flex items-center justify-between rounded-xl border border-default-200 bg-background px-4 text-foreground font-medium text-sm focus-within:border-primary transition-colors">
                                                    <div className="flex items-center gap-2">
                                                        <Users size={18} className="text-default-400" />
                                                        <Select.Value />
                                                    </div>
                                                    <Select.Indicator />
                                                </Select.Trigger>

                                                <Select.Popover className="bg-content1 border border-default-100 rounded-2xl shadow-xl p-1 z-50">
                                                    <ListBox className="text-foreground outline-none">
                                                        {[
                                                            { value: "Male", label: "Male" },
                                                            { value: "Female", label: "Female" },
                                                            { value: "Other", label: "Other" }
                                                        ].map((item) => (
                                                            <ListBox.Item
                                                                key={item.value}
                                                                id={item.value}
                                                                textValue={item.label}
                                                                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm cursor-pointer data-[focused=true]:bg-default-100 data-[selected=true]:text-primary data-[selected=true]:font-bold outline-none"
                                                            >
                                                                <Label className="cursor-pointer">{item.label}</Label>
                                                                <ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                        ))}
                                                    </ListBox>
                                                </Select.Popover>
                                            </Select>
                                        </div>

                                        {/* Preferred Date Input */}
                                        <div className="w-full flex flex-col gap-2">
                                            <Label className="text-sm font-medium text-foreground pl-0.5">Preferred Date</Label>
                                            <div className="relative flex items-center">
                                                <Calendar size={18} className="absolute left-4 text-default-foreground pointer-events-none z-10" />
                                                <Input
                                                    type="date"
                                                    name="bookingDate"
                                                    value={bookingDate}
                                                    onChange={(e) => setBookingDate(e.target.value)}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    required
                                                    className="h-14 w-full rounded-xl border border-default-200 bg-background pl-11 pr-4 text-sm text-foreground outline-none focus-within:border-primary transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Label className="text-sm font-medium text-foreground pl-0.5">Appointment time</Label>
                                        <input type="text"
                                            name="appointmentTime"
                                            value={appointmentTime}
                                            onChange={(e) => setAppointmentTime(e.target.value)}
                                            placeholder="Enter appointment time"
                                            className="h-14 w-full rounded-xl border border-default-200 bg-background pl-4 pr-4 text-sm text-foreground outline-none focus-within:border-primary transition-colors"
                                            required
                                        />
                                    </div>
                                </Modal.Body>

                                <Modal.Footer className="p-6 pt-4 border-t border-default-100 flex justify-end gap-3 bg-default-50/50">
                                    <Button variant="danger" className="rounded-xl font-medium" slot="close">
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="rounded-xl bg-primary text-primary-foreground font-bold px-6">
                                        Confirm Booking
                                    </Button>
                                </Modal.Footer>

                            </form>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default EditBookedAppointment;