import Header from "./Header";
import Footer from "./Footer.jsx";
import NewLink from "./NewLink.jsx";
import ModalContent from "./Modal/ModalContent.jsx";
import ContextMenu from "./ContextMenu";
import { Toaster } from "react-hot-toast";
import propTypes from "prop-types";
const Layout = ({ children }) => {
  Layout.propTypes = {
    children: propTypes.node.isRequired,
  };
 

  return (
    <div className="relative w-full bg-white dark:bg-d-darkGray min-h-screen flex flex-col scrollbar overflow-x-hidden">
      <Header />
      <ContextMenu />
      <Toaster
        toastOptions={{
          style: {
            background:  "#2a4ff6",
            color:"#fff",
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
