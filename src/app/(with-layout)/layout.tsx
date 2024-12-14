import getCurrentUser from "../actions/getCurrentUser";
import Navbar from "../components/navbar/Navbar";
import TrainList from "../components/utils/TrainList";
import RegisterModal from "@/app/components/modals/RegisterModal";
import LoginModal from "@/app/components/modals/LoginModal";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  
  return (
    <>
      <Navbar currentUser={currentUser} />
      <RegisterModal />
      <LoginModal />
      <div>
        <TrainList />
      </div>
      {children}
    </>
  );
} 