/* eslint-disable no-undef */
import { useState, useEffect, createContext, ReactNode } from "react";
import { goTo, goBack } from "react-chrome-extension-router";
import useContextMenu from "../hooks/useContextMenu";
import { useModalContext } from ".";
import { useThemeContext } from ".";
import useNav from "../hooks/useNav";
import usePreviewLink from "../hooks/usePreviewLink";
import SearchResults from "../components/SearchResults";
import Folder from "../components/Folder";
import { getInitialLinks } from "../utils/api";
interface Link {
  url: string;
  url_name: string;
  // Add other properties if necessary
}

interface Folder {
  folder_name: string;
  links: Link[];
}

interface AppContextType {
  links: Link[];
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  menu: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  route: string;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  navRef: React.RefObject<HTMLElement>;
  hoveredLink: Link | null;
  setHoveredLink: React.Dispatch<React.SetStateAction<Link | null>>;
  inputError: boolean;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;
  contextMenu: any;
  setContextMenu: React.Dispatch<React.SetStateAction<any>>;
  contextMenuRef: React.RefObject<HTMLElement>;
  handleContextMenu: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleHideContextMenu: () => void;
  previewLink: any;
  previewLinkRef: React.RefObject<HTMLElement>;
  handleHover: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleHidePreviewLink: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalText: string;
  editIndex: number | null;
  inputs: any;
  setInputs: React.Dispatch<React.SetStateAction<any>>;
  folderInputs: any;
  setFolderInputs: React.Dispatch<React.SetStateAction<any>>;
  openModal: () => void;
  handleClose: () => void;
  modalRef: React.RefObject<HTMLElement>;
  folderDetails: any;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [active, setActive] = useState("Home");
  const [searchInput, setSearchInput] = useState("");
  const [menu, setMenu] = useState("Unnamed");
  const [route, setRoute] = useState("Home");
  const { toggle, setToggle, navRef } = useNav();
  const [hoveredLink, setHoveredLink] = useState<Link | null>(null);
  const [inputError, setInputError] = useState(false);
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

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    async function initializeApp() {
      const links = await getInitialLinks();
      console.log("linksdaxxxxxxxxxxxx", links);
      setLinks(links);
    }

    initializeApp();
    //   async function fetchSession() {
    //     const sessionid = localStorage.getItem("sessionid");
    //     const parsedSessionId = sessionid ? JSON.parse(sessionid) : null;

    //     console.log("sessionid", parsedSessionId);
    //     if (!parsedSessionId) {
    //       try {
    //         const response = await fetch("http://localhost:3000/api/session", {
    //           method: "GET",
    //           credentials: "include",
    //           headers: {
    //             "Content-Type": "application/json",
    //             "X-Extension-ID": "bbgippochabbclmbgkkbbofljdfnbdop",
    //           },
    //         });
    //         if (!response.ok) {
    //           throw new Error("Network response was not ok");
    //         }
    //         const data = await response.json();
    //         console.log("data", data);
    //         localStorage.setItem("sessionid", JSON.stringify(data.user.id));
    //         return data.user.id;
    //       } catch (error) {
    //         console.error("Fetch error:", error);
    //         return null;
    //       }
    //     }
    //     return parsedSessionId;
    //   }

    // async function fetchLinks(sessionid: string) {
    //   console.log("sessionid", sessionid);
    //   if (!sessionid) {
    //     const localLinks = localStorage.getItem("Links") || "[]";
    //     const parsedLinks = JSON.parse(localLinks);
    //     console.log("localLinks", localLinks);
    //     setLinks(parsedLinks);
    //   } else {
    //     try {
    //       const response = await fetch(
    //         `http://localhost:3000/api/links?id=${sessionid}`,
    //         {
    //           method: "GET",
    //           headers: {
    //             "Content-Type": "application/json",
    //             "X-Extension-ID": "bbgippochabbclmbgkkbbofljdfnbdop",
    //           },
    //           credentials: "include",
    //         }
    //       );
    //       if (!response.ok) {
    //         throw new Error("Network response was not ok");
    //       }
    //       const data = await response.json();
    //       console.log("data", data);
    //       setLinks(data.links || []);
    //       localStorage.setItem("Links", JSON.stringify(data.links || []));
    //     } catch (error) {
    //       console.error("Error fetching links:", error);
    //     }
    //   }
    // }

    // async function fetchFolders(sessionid: string) {
    //   if (!sessionid) {
    //     const localFolders = JSON.parse(localStorage.getItem("Folders") || "[]");
    //     console.log("localFolders", localFolders);
    //     setFolders(localFolders);
    //   } else {
    //     try {
    //       console.log("fetching sessionid", sessionid);
    //       const response = await fetch(
    //         `http://localhost:3000/api/folders?id=${sessionid}`,
    //         {
    //           method: "GET",
    //           headers: {
    //             "Content-Type": "application/json",
    //             "X-Extension-ID": "bbgippochabbclmbgkkbbofljdfnbdop",
    //           },
    //           credentials: "include",
    //         }
    //       );
    //       if (!response.ok) {
    //         throw new Error("Network response was not ok");
    //       }
    //       const data = await response.json();
    //       console.log("data", data);
    //       setFolders(data.folders || []);
    //       localStorage.setItem("Folders", JSON.stringify(data.folders || []));
    //     } catch (error) {
    //       console.error("Error fetching folders:", error);
    //     }
    //   }
    // }

    // async function initializeApp() {
    //   const sessionid = await fetchSession();
    //   await fetchLinks(sessionid);
    //   await fetchFolders(sessionid);
    // }

    // const messageListener = (message: { action: string }) => {
    //   if (message.action === "updateLinks") {
    //     initializeApp();
    //   }
    //   if (message.action === "updateFolders") {
    //     // const folders = getInitialFolders();
    //     setFolders(folders);
    //     goTo(Folder);
    //     setRoute("Folder");
    //     setActive("Folders");
    //   }
    //   if (message.action === "namedLinkAdded") {
    //     setMenu("Named");
    //   }
    // };

    // chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      // chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  // useEffect(() => {
  //   async function updateLinks(newLinks: Link[]) {
  //     const sessionid = JSON.parse(localStorage.getItem("sessionid") || "null");
  //     if (!sessionid) {
  //       console.error("No session ID found in localStorage");
  //       return;
  //     }

  //     const requestBody = {
  //       id: sessionid,
  //       links: newLinks,
  //     };

  //     try {
  //       const response = await fetch("http://localhost:3000/api/updateLinks", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Extension-ID": "bbgippochabbclmbgkkbbofljdfnbdop",
  //         },
  //         credentials: "include",
  //         body: JSON.stringify(requestBody),
  //       });
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       if (data.error) {
  //         console.error("Error updating links:", data.error);
  //       } else {
  //         console.log("Links updated successfully:", data);
  //       }
  //     } catch (error) {
  //       console.error("Error making API request:", error);
  //     }
  //   }

  //   if (links.length > 0) {
  //     localStorage.setItem("Links", JSON.stringify(links));
  //     updateLinks(links);
  //   }
  // }, [links]);

  // useEffect(() => {
  //   async function updateFolders(newFolders: Folder[]) {
  //     const sessionid = JSON.parse(localStorage.getItem("sessionid") || "null");
  //     if (!sessionid) {
  //       console.error("No session ID found in localStorage");
  //       return;
  //     }

  //     const requestBody = {
  //       id: sessionid,
  //       folders: newFolders,
  //     };

  //     try {
  //       const response = await fetch("http://localhost:3000/api/updateFolders", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Extension-ID": "bbgippochabbclmbgkkbbofljdfnbdop",
  //         },
  //         credentials: "include",
  //         body: JSON.stringify(requestBody),
  //       });
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       if (data.error) {
  //         console.error("Error updating folders:", data.error);
  //       } else {
  //         console.log("Folders updated successfully:", data);
  //       }
  //     } catch (error) {
  //       console.error("Error making API request:", error);
  //     }

  //     if (folders.length > 0) {
  //       localStorage.setItem("Folders", JSON.stringify(folders));
  //       updateFolders(folders);
  //     }
  //   }
  // }, [folders]);

  console.log("Links in state", links);
  console.log("Folders in state", folders);

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
