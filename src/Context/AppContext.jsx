import React, { useState, createContext, useContext } from "react";

const Context = createContext();

export const AppContext = ({ children }) => {
  ////////////////////////////         STATE ////////////////////////////
  const [links, setLinks] = useState(() => {
    return JSON.parse(localStorage.getItem("Links")) || [];
  }, []);
  const [showAdd, setShowAdd] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [menu, setMenu] = useState("unnamed");
  const [showWarning, setShowWarning] = useState(false);

  ///////////////////// FUNCTIONS ////////////////////////////////////////////
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <Context.Provider
      value={{
        links,
        setLinks,
        menu,
        setMenu,
        showAdd,
        setShowAdd,
        showWarning,
        setShowWarning,
        handleSearchInputChange,
        searchInput,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
