"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateUserProfile = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session?.user) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setName(session.user.name || "");
            setImage(session.user.image || "");
        }
    }, [session]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(false);

        try {
            const { data, error } = await authClient.updateUser({
                name,
                image,
            });

            if (error) {
                toast.error(error.message || "Update failed!");
                return;
            }

            await authClient.getSession({
                fetchOptions: {
                    cache: "no-store",
                },
            });
            router.refresh();
            toast.success("Profile updated successfully!");
            setIsOpen(false);

        } catch (err) {
            console.error("Update Error:", err);
            toast.error("An unexpected error occurred.");
        }
    };

    return (
        <div>
            <Button 
                color="primary" 
                variant="flat" 
                className="font-bold w-full mx-4 rounded-xl h-11 border border-blue-100 bg-primary text-primary-foreground hover:bg-primary/70 transition-colors"
                onClick={() => setIsOpen(true)}
            >
                Update Profile
            </Button>

            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-md">
                            <Modal.CloseTrigger onClick={() => setIsOpen(false)} />
                            
                            <Modal.Header>
                                <Modal.Icon className="bg-accent text-accent-foreground">
                                    <User2 className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading className="text-accent-foreground">Update Profile</Modal.Heading>
                                <p className="mt-1.5 text-sm leading-5 text-card-foreground">
                                    Update your profile information to keep your account up to date.
                                </p>
                            </Modal.Header>

                            <form onSubmit={handleUpdate}>
                                <Modal.Body className="p-6">
                                    <Surface variant="default">
                                        <div className="flex flex-col gap-4">
                                            <TextField className="w-full" name="name" type="text">
                                                <Label>Name</Label>
                                                <Input 
                                                    className="placeholder:text-accent-foreground" 
                                                    placeholder="Enter your name" 
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                            </TextField>
                                            
                                            <TextField className="w-full" name="image" type="url">
                                                <Label>Image URL</Label>
                                                <Input 
                                                    className="placeholder:text-accent-foreground" 
                                                    placeholder="Enter image URL" 
                                                    value={image}
                                                    onChange={(e) => setImage(e.target.value)}
                                                    required
                                                />
                                            </TextField>
                                        </div>
                                    </Surface>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button 
                                        type="button" 
                                        variant="secondary" 
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        color="primary" 
                                        type="submit"
                                        isLoading={loading}
                                    >
                                        Save
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

export default UpdateUserProfile;