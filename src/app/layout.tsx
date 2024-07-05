import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import Header from "./components/Header";
import AuthProvider from "./components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz",
  description: "Quiz App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <Toaster />

        </AuthProvider>
      </body>
    </html>
  );
}
