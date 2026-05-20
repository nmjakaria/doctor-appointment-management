'use client';

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  Link,
  CardContent,
  Form,
  TextField,
  Label,
  Input,
  FieldError
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import { MdLinkedCamera } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image || "",
      });

      if (data) {
        toast.success("You have successfully signed up!");
        router.push('/login');
      }

      if (error) {
        toast.error(`Sign Up problem: ${error.message || error}`);
      }
    } catch (err) {
      toast.error("Something went wrong: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      toast.error("Google sign in failed");
    }
  };

  return (
    <div className="flex justify-center items-center py-20 px-4">
      <Card className="w-full max-w-lg p-8 rounded-[40px] border border-default-100 shadow-2xl relative overflow-hidden">

        <CardHeader className="flex flex-col gap-2 items-center text-center pb-8 border-b border-default-50">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-2">
            <UserPlus className="text-primary-foreground" size={24} />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Create Account</h1>
          <p className="text-muted-foreground font-medium">Join our healthcare community</p>
        </CardHeader>

        <CardContent className="py-8 space-y-6">
          <Form className="space-y-6" onSubmit={handleRegister} validationBehavior="native">

            {/* Full Name Field */}
            <TextField isRequired className="w-full flex flex-col gap-1.5">
              <Label className="font-bold text-foreground/90 text-sm">Full Name</Label>
              <div className="relative flex items-center">
                <div className="absolute left-4 z-10 pointer-events-none text-default-400">
                  <User size={18} />
                </div>
                <Input
                  name="name"
                  type="text"
                  placeholder="Md Shahriar Alam"
                  className="h-14 w-full pl-11 pr-4 rounded-xl border border-default-200 bg-background text-foreground placeholder:text-foreground/50 outline-none focus-within:border-primary transition-colors text-sm"
                />
              </div>
              <FieldError className="text-xs text-danger font-medium mt-1" />
            </TextField>

            {/* Image URL Field */}
            <TextField className="w-full flex flex-col gap-1.5">
              <Label className="font-bold text-foreground/90 text-sm">Image Url</Label>
              <div className="relative flex items-center">
                <div className="absolute left-4 z-10 pointer-events-none text-default-400">
                  <MdLinkedCamera size={18} />
                </div>
                <Input
                  name="image"
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  className="h-14 w-full pl-11 pr-4 rounded-xl border border-default-200 bg-background text-foreground placeholder:text-foreground/50 outline-none focus-within:border-primary transition-colors text-sm"
                />
              </div>
              <FieldError className="text-xs text-danger font-medium mt-1" />
            </TextField>

            {/* Email Address Field */}
            <TextField
              isRequired
              className="w-full flex flex-col gap-1.5"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="font-bold text-foreground/90 text-sm">Email Address</Label>
              <div className="relative flex items-center">
                <div className="absolute left-4 z-10 pointer-events-none text-default-400">
                  <Mail size={18} />
                </div>
                <Input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-14 w-full pl-11 pr-4 rounded-xl border border-default-200 bg-background text-foreground placeholder:text-foreground/50 outline-none focus-within:border-primary transition-colors text-sm"
                />
              </div>
              <FieldError className="text-xs text-danger font-medium mt-1" />
            </TextField>

            {/* Password Field */}
            <TextField
              isRequired
              className="w-full flex flex-col gap-1.5"
              validate={(value) => {
                if (value.length < 8) return "Password must be at least 8 characters";
                if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                return null;
              }}
            >
              <Label className="font-bold text-foreground/90 text-sm">Password</Label>
              <div className="relative flex items-center">
                <div className="absolute left-4 z-10 pointer-events-none text-default-400">
                  <Lock size={18} />
                </div>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-14 w-full pl-11 pr-4 rounded-xl border border-default-200 bg-background text-foreground placeholder:text-foreground/50 outline-none focus-within:border-primary transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <IoMdEyeOff size={30} /> : <IoMdEye size={30} />}
                </button>
              </div>
              <FieldError className="text-xs text-danger font-medium mt-1" />
            </TextField>
            <Button
              type="submit"
              className="w-full h-14 bg-primary text-primary-foreground font-bold hover:scale-[1.02] transition-transform shadow-xl shadow-primary/10"
              isLoading={loading}
            >
              Sign Up
            </Button>
          </Form>

          {/* Social Register Splitter */}
          <div className="relative flex items-center gap-4 py-2">
            <div className="h-px bg-primary grow" />
            <span className="text-xs text-foreground font-bold uppercase tracking-wider">Join with</span>
            <div className="h-px bg-primary grow" />
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              className="rounded-xl border-primary font-bold text-foreground h-12 w-full"
              onPress={signInGoogle}
            >
              <FcGoogle />
              Continue with Google
            </Button>
          </div>
        </CardContent>

        <CardFooter className="justify-center border-t border-default-50 pt-8">
          <p className="text-sm text-muted-foreground font-medium tracking-tight">
            Already have an account?
            <Link href="/login" className="font-extrabold text-primary hover:underline ml-1">
              Login
            </Link>
          </p>
        </CardFooter>

        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full -mr-16 -mt-16" />
      </Card>
    </div>
  );
}