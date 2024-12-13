import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ToasterProvider from "./providers/toasterProvider";
import RegisterModal from "@/app/components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import { User } from "@prisma/client";
import { NextAuthProvider } from "./components/utils/NextAuthProvider";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "trainstation",
  description: "trainstation",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
            <ClientOnly>
            <Navbar currentUser={currentUser}/>
            <ToasterProvider />
            <RegisterModal />
            <LoginModal />
            </ClientOnly>
        </NextAuthProvider>
        {children}
      </body>
    </html>
  );
}
