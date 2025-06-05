import type React from "react";
import { Noto_Sans } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={notoSans.variable}>
      <body className={notoSans.className}>
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
          <main className="flex-1 overflow-auto">{children}</main>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
