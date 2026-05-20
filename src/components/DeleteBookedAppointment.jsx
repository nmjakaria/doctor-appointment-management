"use client";
import { deleteAppointment } from '@/lib/actions';
import { authClient } from '@/lib/auth-client';
import { AlertDialog, Button } from '@heroui/react';
import { Trash2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';


const DeleteBookedAppointment = ({appointment}) => {
    const { _id } = appointment;
    const hendleDeleteDestination = async () => {
        const {data: tokenData} = await authClient.token();
        const token = tokenData?.token;

        try {
            await deleteAppointment(_id, token);
            toast.success("Appointment deleted successfully");
        }
        catch (error) {
            toast.error("Error deleting appointment:", error);
        }
    };
    return (
        <div>
            <AlertDialog>
                <Button isIconOnly size="sm" variant="flat" color="danger" className="rounded-xl w-9 h-9 bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-200 transition-all text-slate-600 hover:text-rose-600">
                    <Trash2 size={15} />
                </Button>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-100">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Delete the appointment permanently?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body className='text-foreground/80'>
                                <p>
                                    This will permanently delete the <strong>{appointment.doctorName}</strong> appointment and all of its data. This action cannot be undone.
                                </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>
                                <Button onClick={hendleDeleteDestination} slot="close" variant="danger">
                                    Delete
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default DeleteBookedAppointment;