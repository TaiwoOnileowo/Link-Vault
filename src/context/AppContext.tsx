import React, { useState, useEffect, createContext } from "react";
import { goTo, goBack } from "react-chrome-extension-router";
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
  const [inputError, setInputError] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [modalDismissed, setModalDismissed] = useState<boolean>(false);

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
    console.log("Fetching sessionnnnnnnnnnnn");
    try {
      const response = await fetch(
        "https://linkvaultapp.vercel.app/api/session",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-Extension-ID": "bbgippochabbclmbgkkbbofljdfnbdop",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(response);
      console.log(data);
      if (data) {
        setSession(data.session);
        console.log("Session data", data.session);
        setShowSignUpModal(false);
        // updateStorage("session", data.session);
        return data.session.user.id;
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
  console.log("Sessionddddddddddddddd", session);
  const fetchLinks = async (sessionid: string) => {
    try {
      const response = await fetch(
        `https://linkvaultapp.vercel.app/api/links?id=${sessionid}`,
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
        `https://linkvaultapp.vercel.app/api/folders?id=${sessionid}`,
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
    // console.log("session", session);
    // toast.success(`Welcome back ${session.user.name.split(" ")[0]}`, {
    //   duration: 4000,
    //   position: "top-right",
    // });
    const messageListener = (message: { action: string }) => {
      if (message.action === "updateLinks") {
        goTo(Home);
        setMenu("Unnamed");
        initializeApp();
      }
      if (message.action === "namedLinkAdded") {
        goTo(Home);
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
        const response = await fetch(
          "https://linkvaultapp.vercel.app/api/updateLinks",
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
          "https://linkvaultapp.vercel.app/api/updateFolders",
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
    }, 30000); 

    return () => clearInterval(intervalId);
  }, []);

  console.log("Links in state", links);
  console.log("Folders in state", folders);

  return (
    <AppContext.Provider
      value={{
        session,
        setSession,

        inputError,
        setInputError,

        links,
        setLinks,
        menu,
        setMenu,

        handleSearchInputChange,
        searchInput,
        route,
        setRoute,

        folders,
        setFolders,

        active,
        setActive,

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
