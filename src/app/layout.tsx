import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Image from "next/image";

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
        <header className="flex justify-around items-center">
          <Image src="/cnvv-logo.png" alt="Logo" width={200} height={200} />
          <Image src="/penatrans.png" alt="Logo" width={200} height={200} />
        </header>
        {children}
      </body>
      <Toaster />
    </html>
  );
}
