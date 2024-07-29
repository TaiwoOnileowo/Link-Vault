/* eslint-disable no-undef */
import { useState, useEffect, createContext } from "react";
import { goTo, goBack } from "react-chrome-extension-router";
import useContextMenu from "../hooks/useContextMenu";
import { useModalContext } from ".";
import { useThemeContext } from ".";
import useNav from "../hooks/useNav";
import { getInitialLinks, getInitialFolders } from "../utils/api";
import usePreviewLink from "../hooks/usePreviewLink";
import PropTypes from "prop-types";
import SearchResults from "../components/SearchResults";
import Folder from "../components/Folder";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [links, setLinks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [active, setActive] = useState("Home");
  const [searchInput, setSearchInput] = useState("");
  const [menu, setMenu] = useState("Unnamed");
  const [route, setRoute] = useState("Home");
  const { toggle, setToggle, navRef } = useNav();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [inputError, setInputError] = useState(false);
  const {
    contextMenu,
    setContextMenu,
    contextMenuRef,
    handleContextMenu,
    handleHideContextMenu,
  } = useContextMenu();
console.log(menu)
  const { previewLink, previewLinkRef, handleHover, handleHidePreviewLink } =
    usePreviewLink();
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

  useEffect(() => {
    if (searchInput.length > 0) {
      goTo(SearchResults);
    } else {
      goBack();
    }
  }, [searchInput]);

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
        // goTo(Home);
        // setRoute("Home");
        // setActive("Home");
        console.log("home route set");
      }
      if (message.action === "updateFolders") {
        initializeFolders();
        goTo(Folder);
        setRoute("Folder");
        setActive("Folders");
      }
      if (message.action === "namedLinkAdded") {
        setMenu("Named");
      }
    };

    // chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      // chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        hoveredLink,
        setHoveredLink,
        folderDetails,
        previewLink,
        previewLinkRef,
        handleHover,
        handleHidePreviewLink,
        inputError,
        setInputError,
        contextMenu,
        setContextMenu,
        contextMenuRef,
        handleContextMenu,
        handleHideContextMenu,
        route,
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
        setRoute,
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
