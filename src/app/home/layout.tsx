
import ToasterProvider from "@/app/providers/toasterProvider";
import RegisterModal from "@/app/components/modals/RegisterModal";
import LoginModal from "@/app/components/modals/LoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "../components/ClientOnly";
import { User } from "@prisma/client";
import { NextAuthProvider } from "@/app/components/utils/NextAuthProvider";
import SeedDatabase from "../seed/page";
import Card from "@/app/components/utils/TrainCard";
import TrainCard from "@/app/components/utils/TrainCard";
import TrainList from "@/app/components/utils/TrainList";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>       
            <ClientOnly>
            <Navbar currentUser={currentUser}/>
            <div>
              <TrainList />
            </div>
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
