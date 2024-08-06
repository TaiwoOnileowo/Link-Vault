import Header from "./Header";
import Footer from "./Footer.tsx";
import NewLink from "./NewLink.tsx";
import ModalContent from "./Modal/ModalContent.tsx";
import ContextMenu from "./ContextMenu";
import { Toaster } from "react-hot-toast";
import Notifications from "./Notifications/index.jsx";
import React from "react";
import SignUpModal from "./SignUpModal/index.tsx";
import { useAppContext } from "../../context/index.tsx";
import { AppContextType } from "../../types.ts";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { showSignUpModal, modalDismissed } =
    useAppContext() as AppContextType;
 
  return (
    <div className="relative w-full bg-white dark:bg-d-darkGray min-h-screen flex flex-col scrollbar overflow-x-hidden">
      <Header />
      {modalDismissed && <Notifications />}
      <ContextMenu />
      <Toaster
        toastOptions={{
          style: {
            background: "#2a4ff6",
            color: "#fff",
            fontSize: "16px",
            fontFamily: "Poppins",
          },
        }}
        containerStyle={{
          position: "relative",
          top: 300,
        }}
      />
      <NewLink />
      <ModalContent />
      {showSignUpModal && !modalDismissed && <SignUpModal />}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
