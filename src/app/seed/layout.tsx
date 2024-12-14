import Container from "@/app/components/utils/Container";
import getCurrentUser from "../actions/getCurrentUser";
import Navbar from "../components/navbar/Navbar";
import { NextAuthProvider } from "../components/utils/NextAuthProvider";

export default async function SeedLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const currentUser = await getCurrentUser()
    return (
        <Container>
             <NextAuthProvider> 
                <Navbar currentUser={currentUser}/>
            </NextAuthProvider> 
            <div className="py-60">
            <h1 className="text-2xl font-bold mb-4">Database Seeding</h1>
            <p className="text-gray-600 mb-6">Use this page to populate initial data in the database.</p>
            {children}
          </div>
        </Container>
      );
  }