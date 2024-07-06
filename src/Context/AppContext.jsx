import React, { useState, useEffect,  createContext, useContext } from "react";

const Context = createContext();

export const AppContext = ({ children }) => {
  ////////////////////////////         STATE ////////////////////////////
  const [links, setLinks] = useState(() => {
    return JSON.parse(localStorage.getItem("Links")) || [];
  }, []);
  const [darkMode, setDarkMode] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [menu, setMenu] = useState("unnamed");
  const [showWarning, setShowWarning] = useState(false);

  ///////////////////// FUNCTIONS ////////////////////////////////////////////
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Context.Provider
      value={{
        links,
        setLinks,
        menu,
        setMenu,

        showWarning,
        setShowWarning,
        handleSearchInputChange,
        searchInput,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
