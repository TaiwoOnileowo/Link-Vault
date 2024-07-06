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
import { useInputsContext } from "./Context/InputsContext";
const App = () => {
  const { showWarning , darkMode} = useAppContext();
  const { showCustomName, showAdd } = useInputsContext();
  console.log(showCustomName);
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
