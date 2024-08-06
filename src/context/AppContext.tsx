import React, { useState, useEffect, createContext } from "react";
import { goTo, goBack } from "react-chrome-extension-router";
import useContextMenu from "../hooks/useContextMenu";
import { useModalContext } from ".";
import { useThemeContext } from ".";
import useNav from "../hooks/useNav";
import usePreviewLink from "../hooks/usePreviewLink";

import SearchResults from "../components/SearchResults.tsx";
import Folder from "../components/Folder/index.tsx";
import Home from "../components/Home/index.tsx";
import { updateStorage } from "../utils/api";
export const AppContext = createContext<AppContextType | undefined>(undefined);

import { AppContextType, Links, Folders, Session } from "../types.ts";
import toast from "react-hot-toast";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [links, setLinks] = useState<Links[]>([]);
  const [folders, setFolders] = useState<Folders[]>([]);
  const [active, setActive] = useState<string>("Home");
  const [searchInput, setSearchInput] = useState<string>("");
  const [menu, setMenu] = useState<string>("Unnamed");
  const [route, setRoute] = useState<string>("Home");
  const { toggle, setToggle, navRef } = useNav();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [inputError, setInputError] = useState<boolean>(false);
  const [session, setSession] = useState<Session| null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [modalDismissed, setModalDismissed] = useState<boolean>(false);
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
    setEditIndex,
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

  const fetchSession = async () => {
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
      if (data) {
        setSession(data);
        setShowSignUpModal(false);
        toast.success(
          `Welcome back! You are logged in as ${data.user.name.split(" ")[0]}`,
          {
            duration: 4000,
            position: "top-right",
          }
        );
        // updateStorage("session", data);
        return data.user.id;
      } else if (!modalDismissed) {
        setSession(null);
        setShowSignUpModal(true);
        return null;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      if (!modalDismissed) {
        setShowSignUpModal(true);
      }
      return null;
    }
  };

  const fetchLinks = async (sessionid: string) => {
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
  };

  const fetchFolders = async (sessionid: string) => {
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

      console.log("Folders data", data.folders);
      const folderName = [
        data.folders.map((folder: Folders) => {
          return folder.folder_name;
        }),
      ];
      console.log("Folder name", folderName);
      // updateStorage("folderNames", folderName);
      return data.folders;
    } catch (error) {
      console.error("Error fetching folders:", error);
      return [];
    }
  };

  const initializeApp = async () => {
    const id = await fetchSession();
    console.log("Session ID", id);
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
  };

  useEffect(() => {
    initializeApp();

    const messageListener = (message: { action: string }) => {
      if (message.action === "updateLinks") {
        goTo(Home);
        setMenu("Unnamed");
        initializeApp();
      }
      if (message.action === "namedLinkAdded") {
        setMenu("Named");
        initializeApp();
      }
      if (message.action === "updateFolders") {
        goTo(Folder);
        initializeApp();
      }
    };

    // chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      // chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  useEffect(() => {
    async function updateLinks(newLinks: Links[]) {
      if (!session) {
        console.error("No session ID");
        return;
      }

      const requestBody = {
        id: session.user.id,
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
  }, [links, session]);

  useEffect(() => {
    async function updateFolders(newFolders: Folders[]) {
      if (!session) {
        console.error("No session ID");
        return;
      }

      const requestBody = {
        id: session.user.id,
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
  }, [folders, session]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchSession();
    }, 30000); // Fetch session every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  console.log("Links in state", links);
  console.log("Folders in state", folders);

  return (
    <AppContext.Provider
      value={{
        session,
        setSession,
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
        setEditIndex,
        showSignUpModal,
        setShowSignUpModal,
        modalDismissed,
        setModalDismissed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
