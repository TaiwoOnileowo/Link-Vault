import Header from "./Header";
import Footer from "./Footer.tsx";
import NewLink from "./NewLink.tsx";
import ModalContent from "./Modal/ModalContent.tsx";
import ContextMenu from "./ContextMenu";
import { Toaster } from "react-hot-toast";
import propTypes from "prop-types";
import React from "react";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full bg-white dark:bg-d-darkGray min-h-screen flex flex-col scrollbar overflow-x-hidden">
      <Header />
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
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
