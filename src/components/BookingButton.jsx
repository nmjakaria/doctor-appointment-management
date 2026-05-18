'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { bookAppointment } from "@/lib/actions";
import { Calendar, User, Phone, Users } from "lucide-react";

export default function BookingButton({ doctor }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    if (!session) {
      toast.error("Please login to book an appointment");
      router.push("/login?callback=/appointments/" + doctor._id);
      return;
    }
    onOpen();
  };

  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    gender: "Male",
    appointmentDate: "",
    appointmentTime: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.appointmentDate || !formData.appointmentTime) {
      toast.error("Please select a date and time");
      return;
    }

    setLoading(true);
    try {
      await bookAppointment({
        ...formData,
        userEmail: session.user.email,
        doctorName: doctor.name,
      });
      toast.success("Appointment booked successfully!");
      onClose();
      router.push("/dashboard?tab=bookings");
    } catch (error) {
      toast.error("Failed to book appointment: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button 
        onPress={handleOpen} 
        color="primary" 
        size="lg" 
        className="w-full md:w-auto px-12 h-14 font-bold text-lg rounded-full shadow-lg shadow-primary/30"
      >
        Book Appointment
      </Button>

      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        placement="center"
        backdrop="blur"
        size="xl"
        scrollBehavior="inside"
        className="mx-4"
      >
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Book an Appointment</h2>
              <p className="text-sm font-normal text-default-500">Scheduling with {doctor.name}</p>
            </ModalHeader>
            <ModalBody className="gap-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Patient Name"
                  placeholder="Enter full name"
                  labelPlacement="outside"
                  startContent={<User size={18} className="text-default-400" />}
                  value={formData.patientName}
                  onValueChange={(v) => setFormData({...formData, patientName: v})}
                  required
                />
                <Input
                  label="Phone Number"
                  placeholder="+1 (555) 000-0000"
                  labelPlacement="outside"
                  startContent={<Phone size={18} className="text-default-400" />}
                  value={formData.phone}
                  onValueChange={(v) => setFormData({...formData, phone: v})}
                  required
                />
                <Select 
                  label="Gender" 
                  labelPlacement="outside"
                  placeholder="Select gender"
                  selectedKeys={[formData.gender]}
                  onSelectionChange={(keys) => setFormData({...formData, gender: Array.from(keys)[0]})}
                  startContent={<Users size={18} className="text-default-400" />}
                >
                  <SelectItem key="Male" value="Male">Male</SelectItem>
                  <SelectItem key="Female" value="Female">Female</SelectItem>
                  <SelectItem key="Other" value="Other">Other</SelectItem>
                </Select>
                <Input
                  type="date"
                  label="Preferred Date"
                  labelPlacement="outside"
                  startContent={<Calendar size={18} className="text-default-400" />}
                  value={formData.appointmentDate}
                  min={new Date().toISOString().split('T')[0]}
                  onValueChange={(v) => setFormData({...formData, appointmentDate: v})}
                  required
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium">Available Timeslots</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {doctor.availability?.map((time) => (
                    <Button
                      key={time}
                      size="sm"
                      variant={formData.appointmentTime === time ? "solid" : "bordered"}
                      color={formData.appointmentTime === time ? "primary" : "default"}
                      onPress={() => setFormData({...formData, appointmentTime: time})}
                      className="font-medium"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="border-t border-divider">
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit" isLoading={loading}>
                Confirm Booking
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
