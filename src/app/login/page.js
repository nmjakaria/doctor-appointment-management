'use client';

import { useState, Suspense } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Mail, Lock, LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback") || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      toast.error(error.message || "Failed to login");
      setLoading(false);
    } else {
      toast.success("Welcome back!");
      router.push(callback);
    }
  };

  const handleSocialLogin = async (provider) => {
    await authClient.signIn.social({
      provider,
      callbackURL: callback
    });
  };

  return (
    <div className="flex justify-center items-center py-20 px-4">
      {/* 💡 Changed border and background to use responsive tokens */}
      <Card className="w-full max-w-md p-8 rounded-[40px] border border-default-100 bg-content1 shadow-2xl relative overflow-hidden">
        
        {/* 💡 Adjusted text/border colors to match theme dynamically */}
        <CardHeader className="flex flex-col gap-2 items-center text-center pb-8 border-b border-default-50">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-2">
            <LogIn className="text-primary-foreground" size={24} />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground font-medium">Access your clinical dashboard</p>
        </CardHeader>
        
        <CardContent className="py-8 space-y-6">
          <Form className="space-y-6" onSubmit={handleLogin} validationBehavior="native">
            
            {/* Email Field */}
            <TextField
              isRequired
              name="email"
              type="email"
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
                {/* 💡 Styled with semantic theme-aware tokens */}
                <Input 
                  placeholder="name@example.com" 
                  className="h-14 w-full pl-11 pr-4 rounded-xl border border-default-200 bg-background text-foreground placeholder:text-default-400 outline-none focus-within:border-primary transition-colors text-sm"
                />
              </div>
              <FieldError className="text-xs text-danger font-medium mt-1" />
            </TextField>

            {/* Password Field */}
            <div className="space-y-2">
              <TextField
                isRequired
                name="password"
                type="password"
                className="w-full flex flex-col gap-1.5"
                minLength={8}
              >
                <Label className="font-bold text-foreground/90 text-sm">Password</Label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 z-10 pointer-events-none text-default-400">
                    <Lock size={18} />
                  </div>
                  {/* 💡 Styled with semantic theme-aware tokens */}
                  <Input 
                    placeholder="••••••••" 
                    className="h-14 w-full pl-11 pr-4 rounded-xl border border-default-200 bg-background text-foreground placeholder:text-default-400 outline-none focus-within:border-primary transition-colors text-sm"
                  />
                </div>
                <FieldError className="text-xs text-danger font-medium mt-1" />
              </TextField>
              
              <div className="flex justify-end">
                <Link href="#" size="sm" className="text-primary font-extrabold hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            {/* 💡 Shifted button to adapt to light/dark themes natively */}
            <Button 
              type="submit" 
              color="primary" 
              className="w-full h-14 font-bold hover:scale-[1.02] transition-transform shadow-xl shadow-primary/10"
              isLoading={loading}
            >
              Sign In
            </Button>
          </Form>

          {/* 💡 Divider uses responsive system border color */}
          <div className="relative flex items-center gap-4 py-2">
            <div className="h-px bg-default-100 flex-grow" />
            <span className="text-xs text-default-400 font-bold uppercase tracking-wider">or continue with</span>
            <div className="h-px bg-default-100 flex-grow" />
          </div>

          <div className="flex items-center justify-center">
            <Button 
              variant="outline" 
              className="rounded-xl border-default-200 font-bold text-foreground h-12 w-full"
              onPress={() => handleSocialLogin("google")}
            >
              <FcGoogle/>
              Log in with Google
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="justify-center border-t border-default-50 pt-8">
          <p className="text-sm text-muted-foreground font-medium tracking-tight">
            Don&apos;t have a clinical account? 
            <Link href="/register" className="font-extrabold text-primary hover:underline ml-1">
              Register
            </Link>
          </p>
        </CardFooter>

        {/* 💡 The decorative gradient circle now tints based on your theme color engine */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full -mr-16 -mt-16" />
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-muted-foreground font-medium">Preparing authentication system...</p>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}