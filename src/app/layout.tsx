import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ChatWidget } from "@/components/ChatWidget";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elite Car Hire | Business Portal",
  description: "Advanced Car Hire Management System",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.variable}>
        <Providers>
          {children}
          <MobileBottomNav />
          <ChatWidget position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
