import ToasterProvider from "@/app/providers/toasterProvider";
import RegisterModal from "@/app/components/modals/RegisterModal";
import LoginModal from "@/app/components/modals/LoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import { User } from "@prisma/client";
import { NextAuthProvider } from "@/app/components/utils/NextAuthProvider";
import Card from "@/app/components/utils/TrainCard";
import TrainCard from "@/app/components/utils/TrainCard";
import TrainList from "@/app/components/utils/TrainList";
import { redirect } from 'next/navigation'
export default async function SeedLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const currentUser = await getCurrentUser()
    if(!currentUser){
      redirect('home')
  }
    return (
<body>
  

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
      );
  }