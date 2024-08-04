import { useState, useEffect, createContext } from "react";
import { goTo, goBack } from "react-chrome-extension-router";
import useContextMenu from "../hooks/useContextMenu";
import { useModalContext } from ".";
import { useThemeContext } from ".";
import useNav from "../hooks/useNav";
import { getInitialLinks, getInitialFolders } from "../utils/api";
import usePreviewLink from "../hooks/usePreviewLink";

import SearchResults from "../components/SearchResults.tsx";

import Folder from "../components/Folder/index.tsx";

export const AppContext = createContext();

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [links, setLinks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [active, setActive] = useState("Home");
  const [searchInput, setSearchInput] = useState("");
  const [menu, setMenu] = useState("Unnamed");
  const [route, setRoute] = useState("Home");
  const { toggle, setToggle, navRef } = useNav();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [inputError, setInputError] = useState(false);
  const [sessionid, setSessionid] = useState<string | null>(null);
  const {
    contextMenu,
    setContextMenu,
    contextMenuRef,
    handleContextMenu,
    handleHideContextMenu,
  } = useContextMenu();

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

  const handleSearchInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch("http://localhost:3000/api/session", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-Extension-ID": "bbgippochabbclmbgkkbbofljdfnbdop",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSessionid(data.user.id);
        return data.user.id;
      } catch (error) {
        console.error("Fetch error:", error);
        return null;
      }
    }

    async function fetchLinks(sessionid: string) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/links?id=${sessionid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Extension-ID": "bbgippochabbclmbgkkbbofljdfnbdop",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.links;
      } catch (error) {
        console.error("Error fetching links:", error);
        return [];
      }
    }

    async function fetchFolders(sessionid: string) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/folders?id=${sessionid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Extension-ID": "bbgippochabbclmbgkkbbofljdfnbdop",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.folders;
      } catch (error) {
        console.error("Error fetching folders:", error);
        return [];
      }
    }

    async function initializeApp() {
      const id = await fetchSession();
      if (id) {
        const [fetchedLinks, fetchedFolders] = await Promise.all([
          fetchLinks(id),
          fetchFolders(id),
        ]);
        setLinks((prevLinks) =>
          JSON.stringify(prevLinks) !== JSON.stringify(fetchedLinks)
            ? fetchedLinks
            : prevLinks
        );
        setFolders((prevFolders) =>
          JSON.stringify(prevFolders) !== JSON.stringify(fetchedFolders)
            ? fetchedFolders
            : prevFolders
        );
      }
    }

    initializeApp();

    const messageListener = (message: { action: string }) => {
      if (
        message.action === "updateLinks" ||
        message.action === "updateFolders"
      ) {
        initializeApp();
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

  useEffect(() => {
    async function updateLinks(newLinks: any[]) {
      if (!sessionid) {
        console.error("No session ID");
        return;
      }

      const requestBody = {
        id: sessionid,
        links: newLinks,
      };

      try {
        const response = await fetch("http://localhost:3000/api/updateLinks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Extension-ID": "bbgippochabbclmbgkkbbofljdfnbdop",
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.error) {
          console.error("Error updating links:", data.error);
        } else {
          console.log("Links updated successfully:", data);
        }
      } catch (error) {
        console.error("Error making API request:", error);
      }
    }

    if (links.length > 0) {
      updateLinks(links);
    }
  }, [links, sessionid]);

  useEffect(() => {
    async function updateFolders(newFolders: any[]) {
      if (!sessionid) {
        console.error("No session ID");
        return;
      }

      const requestBody = {
        id: sessionid,
        folders: newFolders,
      };

      try {
        const response = await fetch(
          "http://localhost:3000/api/updateFolders",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Extension-ID": "bbgippochabbclmbgkkbbofljdfnbdop",
            },
            credentials: "include",
            body: JSON.stringify(requestBody),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.error) {
          console.error("Error updating folders:", data.error);
        } else {
          console.log("Folders updated successfully:", data);
        }
      } catch (error) {
        console.error("Error making API request:", error);
      }
    }

    if (folders.length > 0) {
      updateFolders(folders);
    }
  }, [folders, sessionid]);

  console.log("Links in state", links);
  console.log("Folders in state", folders);
  return (
    <AppContext.Provider
      value={{
        sessionid,
        setSessionid,
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
