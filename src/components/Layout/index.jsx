import React from "react";
import Header from "./Header";
import Footer from "./Footer.jsx";

import NewLink from "./NewLink.jsx";
import ModalContent from "./Modal/ModalContent.jsx";
import ContextMenu from "./ContextMenu";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext.jsx";
const Layout = ({ children }) => {
  const { darkMode } = useAppContext();

  return (
    <div className="relative w-full min-h-screen flex flex-col scrollbar overflow-x-hidden">
      <Header />
      <ContextMenu />
      <Toaster
        toastOptions={{
          style: {
            background: darkMode ? "#2a4ff6" : "#eaf6ff",
            color: darkMode ? "#fff" : "#2a4ff6",
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
