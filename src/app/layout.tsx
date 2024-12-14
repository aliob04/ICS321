import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ToasterProvider from "./providers/toasterProvider";
import { NextAuthProvider } from "./components/utils/NextAuthProvider";
import ClientOnly from "./components/ClientOnly";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextAuthProvider>
          <ClientOnly>
            <ToasterProvider />
          </ClientOnly>
        </NextAuthProvider>
        {children}
      </body>
    </html>
  );
}
