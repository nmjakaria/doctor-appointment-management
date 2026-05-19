'use client';

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Calendar, User, Phone, Users } from "lucide-react";
import { Modal, Button, Input, Select, Label, ListBox, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { createBooking } from "@/lib/actions";

export default function BookingButton({ doctor }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const { _id, name, availability, specialty, hospital, location } = doctor;

  const [loading, setLoading] = useState(false);
  
  const [isOpen, setIsOpen] = useState(false);
  const [patientName, setPatientName] = useState(user?.name);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");
  const [bookingDate, setBookingDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!session) {
      toast.error("Please login to book an appointment");
      return;
    }

    if (!bookingDate || !selectedTime) {
      toast.error("Please select both preferred date and timeslot");
      return;
    }

    setLoading(true);
    
    const appointmentData = {
      userId: user?.id,
      userEmail: user?.email,
      patientName: patientName,
      phone: phone,
      gender: gender,
      doctorId: _id,
      doctorName: name,
      specialty,
      hospital,
      location,
      appointmentDate: new Date(bookingDate),
      appointmentTime: selectedTime
    };

    try {
      const result = await createBooking(appointmentData);

      if (result.success) {
        toast.success(`Appointment booked successfully`);
        setPhone("");
        setBookingDate("");
        setSelectedTime("");
        setIsOpen(false);
      } else {
        toast.error("Failed to book appointment");
      }
    } catch (error) {
      toast.error("Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button
          size="lg"
          className="w-full md:w-auto bg-primary text-primary-foreground px-12 h-14 font-bold text-lg rounded-full shadow-lg shadow-primary/30"
        >
          Book Appointment
        </Button>

        <Modal.Backdrop className="backdrop-blur-md bg-black/30">
          <Modal.Container className="max-w-xl mx-auto my-8 p-4">
            <Modal.Dialog>
              <Modal.CloseTrigger />
              
              <form onSubmit={handleBooking}>

                <Modal.Header className="p-6 pb-2 flex flex-col gap-1 border-b border-default-100">
                  <Modal.Heading className="text-2xl font-bold text-foreground">
                    Book an Appointment
                  </Modal.Heading>
                  <p className="text-sm font-normal text-default-500">
                    Scheduling with {name}
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
                          placeholder="Enter full name"
                          value={patientName || ""}
                          onChange={(e) => setPatientName(e.target.value)}
                          required
                          className="h-14 w-full rounded-xl border border-default-200 text-sm bg-background pl-11 pr-4 text-foreground placeholder:text-foreground outline-none focus-within:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone Number Input */}
                    <div className="w-full flex flex-col gap-2">
                      <Label className="text-sm font-medium text-foreground pl-0.5">Phone Number</Label>
                      <div className="flex items-center relative">
                        <Phone size={18} className="absolute left-4 text-foreground pointer-events-none z-10" />
                        <Input
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
                        selectedKey={gender}
                        onSelectionChange={setGender}
                        className="w-full"
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
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                          className="h-14 w-full rounded-xl border border-default-200 bg-background pl-11 pr-4 text-sm text-foreground outline-none focus-within:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Available Timeslots */}
                  <div className="space-y-3 pt-2">
                    <p className="text-sm font-semibold text-foreground">Available Timeslots</p>
                    <div className="grid grid-cols-2  gap-3">
                      {availability?.map((time) => {
                        const isCurrentSelected = selectedTime === time;

                        return (
                          <label
                            key={time}
                            className={`relative flex items-center justify-center h-11 rounded-xl text-sm font-medium border cursor-pointer select-none transition-all duration-200 ${
                              isCurrentSelected
                                ? "border-primary bg-primary text-primary-foreground shadow-sm font-bold"
                                : "border-default-200 bg-background text-foreground hover:bg-default-50 hover:border-default-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="appointmentTime"
                              value={time}
                              checked={isCurrentSelected}
                              onChange={() => setSelectedTime(time)}
                              className="sr-only"
                            />

                            <span>{time}</span>

                            {isCurrentSelected && (
                              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-background rounded-full" />
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </Modal.Body>

                <Modal.Footer className="p-6 pt-4 border-t border-default-100 flex justify-end gap-3 bg-default-50/50">
                  <Button variant="danger" className="rounded-xl font-medium" slot="close">
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={loading} className="rounded-xl bg-primary text-primary-foreground font-bold px-6">
                    Confirm Booking
                  </Button>
                </Modal.Footer>

              </form>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}