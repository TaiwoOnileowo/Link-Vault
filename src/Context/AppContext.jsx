import { useState, useEffect, createContext, useContext } from "react";
import { initialLinks, initialFolders, initialRoutes } from "../constants/initialStates";
import useContextMenu from "../hooks/useContextMenu";
import { useModalContext } from "./ModalContext";
import { useThemeContext } from "./ThemeContext";
import useNav from "../hooks/useNav";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [links, setLinks] = useState(initialLinks);
  const [folders, setFolders] = useState(initialFolders);
  const [active, setActive] = useState("Home");
  const [searchInput, setSearchInput] = useState("");
  const [menu, setMenu] = useState("Unnamed");
  const [routes, setRoutes] = useState(initialRoutes);
  const { toggle, setToggle, navRef } = useNav();
  const {
    contextMenu,
    setContextMenu,
    contextMenuRef,
    handleContextMenu,
    handleHideContextMenu,
  } = useContextMenu();

  const {
    isOpen,
    setIsOpen,
    modalText,
    editIndex,
    inputs,
    setInputs,
    folderInputs,
    setFolderInputs,
    openModal,
    handleClose,
    modalRef,
  } = useModalContext();

  const { darkMode, setDarkMode } = useThemeContext();

  const handleSetRoutes = (value) => {
    const updatedRoutes = Object.keys(routes).reduce((acc, key) => {
      acc[key] = key === value; // Set current key to true if it matches the value, false otherwise
      return acc;
    }, {});

    setRoutes(updatedRoutes);
  };

  useEffect(() => {
    if (searchInput) {
      handleSetRoutes("search");
    } else {
      setRoutes((prevRoutes) => ({
        ...prevRoutes,
        search: false,
        home: true,
      }));
      setActive("Home");
    }
  }, [searchInput]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <AppContext.Provider
      value={{
        contextMenu,
        setContextMenu,
        contextMenuRef,
        handleContextMenu,
        handleHideContextMenu,
        routes,
        setRoutes,
        folderInputs,
        setFolderInputs,
        inputs,
        setInputs,
        modalText,
        modalRef,
        links,
        setLinks,
        menu,
        setMenu,
        handleClose,
        editIndex,
        openModal,
        isOpen,
        setIsOpen,
        handleSearchInputChange,
        searchInput,
        darkMode,
        setDarkMode,
        handleSetRoutes,
        setToggle,
        toggle,
        folders,
        setFolders,
        navRef,
        active,
        setActive,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
