import React from "react";
import Header from "./components/Header";
import RenderedLinks from "./components/RenderedLinks/RenderedLinks";
import Footer from "./components/Footer";
import Inputs from "./components/Inputs/Inputs";
import Search from "./components/Search";
import Warning from "./components/Warning";
import { Toaster } from "react-hot-toast";
import ContextMenu from "./components/RenderedLinks/ContextMenu";
import { useAppContext } from "./Context/AppContext";

const App = () => {
  const { showAdd, showWarning } = useAppContext();
  return (
    <div className="w-[550px] scrollbar max-h-[550px]">
      <Header />
      <ContextMenu />
      <Toaster
        toastOptions={{
          style: {
            background: "#2a4ff6",
            color: "#fff",
            fontSize: "17px",
            fontFamily: "Poppins",
          },
        }}
        containerStyle={{
          position: "relative",
          top: 300,
          marginLeft: 260,
        }}
      />
      {showAdd ? (
        <Inputs />
      ) : (
        <>
          <Search />
        </>
      )}
      {showWarning ? <Warning /> : <RenderedLinks />}

      <Footer />
    </div>
  );
};

export default App;
