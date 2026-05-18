'use client';

import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";

export default function Providers({ children }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      {children}
      <Toaster richColors position="top-right" expand={false} />
    </NextUIProvider>
  );
}
