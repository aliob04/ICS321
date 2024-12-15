import RegisterModal from "@/app/components/modals/RegisterModal";
import LoginModal from "@/app/components/modals/LoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import { User } from "@prisma/client";
import { NextAuthProvider } from "@/app/components/utils/NextAuthProvider";
import TrainList from "@/app/components/utils/TrainList";
import ToasterProvider from "@/app/providers/toasterProvider";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const currentUser = await getCurrentUser();
    if(!currentUser || !currentUser.accessLevel){
        redirect('home')
    }
    return (
      <html lang="en">
        <body>
          
            <NextAuthProvider>
              <ClientOnly>
                <Navbar currentUser={currentUser} />
                <div>
                  <TrainList />
                </div>
                <ToasterProvider />
                <RegisterModal />
                <LoginModal />
                {children} {/* Move this inside the condition */}
              </ClientOnly>
            </NextAuthProvider>
        
        </body>
      </html>
    );
  }
  