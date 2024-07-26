/* eslint-disable no-undef */
import { useState, useEffect, createContext, useCallback } from "react";
import { initialRoutes } from "../constants/initialStates";
import useContextMenu from "../hooks/useContextMenu";
import { useModalContext } from ".";
import { useThemeContext } from ".";
import useNav from "../hooks/useNav";
import { getInitialLinks, getInitialFolders } from "../utils/api";

export const AppContext = createContext();

import PropTypes from "prop-types";

export const AppProvider = ({ children }) => {
  AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [links, setLinks] = useState([]);
  const [folders, setFolders] = useState([]);
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
    folderDetails,
  } = useModalContext();

  const { darkMode, setDarkMode } = useThemeContext();

  const handleSetRoutes = useCallback(
    (value) => {
      const updatedRoutes = Object.keys(routes).reduce((acc, key) => {
        acc[key] = key === value;
        return acc;
      }, {});

      setRoutes(updatedRoutes);
    },
    [routes]
  );

  useEffect(() => {
    if (searchInput) {
      handleSetRoutes("search");
    }
  }, [searchInput, handleSetRoutes]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    async function initializeLinks() {
      const links = await getInitialLinks();
      setLinks(links);
    }
    async function initializeFolders() {
      const folders = await getInitialFolders();
      setFolders(folders);
    }
    initializeLinks();
    initializeFolders();

    const messageListener = (message) => {
      if (message.action === "updateLinks") {
        initializeLinks();
      }
      if (message.action === "updateFolders") {
        initializeFolders();
        handleSetRoutes("folders");
      }
      if (message.action === "namedLinkAdded") {
        setMenu("Named");
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, [handleSetRoutes]);

  return (
    <AppContext.Provider
      value={{
        folderDetails,
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

// Remove the useAppContext hook from this file
