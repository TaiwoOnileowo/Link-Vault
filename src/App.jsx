import React, { useState, useRef } from "react";
import Header from "./components/Header";
import RenderedLinks from "./components/RenderedLinks/RenderedLinks";
import Footer from "./components/Footer";
import Inputs from "./components/Inputs/Inputs";
import Search from "./components/Search";
import Warning from "./components/Warning";
import { Toaster } from "react-hot-toast";
import ContextMenu from "./components/RenderedLinks/ContextMenu";
const App = () => {
  const [links, setLinks] = useState(() => {
    return JSON.parse(localStorage.getItem("Links")) || [];
  }, []);
  const [showAdd, setShowAdd] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [menu, setMenu] = useState("unnamed");
  const [showWarning, setShowWarning] = useState(false);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

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
        <Inputs
          links={links}
          setLinks={setLinks}
          setShowAdd={setShowAdd}
          setMenu={setMenu}
        />
      ) : (
        <>
          <Search
            setShowAdd={setShowAdd}
            handleSearchInputChange={handleSearchInputChange}
            links={links}
            setShowWarning={setShowWarning}
          />
        </>
      )}
      {showWarning ? (
        <Warning setShowWarning={setShowWarning} setLinks={setLinks} />
      ) : (
        <RenderedLinks
          links={links}
          setLinks={setLinks}
          searchInput={searchInput}
          menu={menu}
          setMenu={setMenu}
        />
      )}

      <Footer />
    </div>
  );
};

export default App;
