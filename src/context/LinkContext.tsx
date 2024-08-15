import React, {
  useState,
  createContext,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { useAppContext, useModalContext } from "./index";
import { useFolderContext } from "./index";
import { copyToClipboard } from "../utils/clipboardUtils";
import { toggleSelection, toggleBulkSelection } from "../utils/selectionUtils";
import { togglePin } from "../utils/pinUtils";
import { handleBulkCopyItems } from "../utils/copyBulkItems";
import { handleBulkDeleteItems, handleDeleteItems } from "../utils/deleteUtils";

import {
  LinkContextProps,
  Links,
  Folders,
  AppContextType,
  ModalContextType,
  FolderContextType,
} from "../types";
import { goTo } from "react-chrome-extension-router";
import Folder from "../components/Folder";

export const LinkContext = createContext<LinkContextProps | undefined>(
  undefined
);

interface LinkProviderProps {
  children: ReactNode;
}

export const LinkProvider = ({ children }: LinkProviderProps) => {
  const {
    menu,
    links,
    setLinks,

    folders,
    setFolders,

    setActive,
    route,
  } = useAppContext() as AppContextType;
  const { openModal, modalText, handleClose } =
    useModalContext() as ModalContextType;
  const { setShowFolderCheckboxes, openFolderIndex } =
    useFolderContext() as FolderContextType;
  const unnamedLinks = links.filter((link) => !link.url_name);
  const namedLinks = links.filter((link) => link.url_name);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [isFolder, setIsFolder] = useState(route === "Folder");
  const [isFolderLinks, setIsFolderLinks] = useState(false);
  const [existingLinks, setExistingLinks] = useState<Links[]>(links);

  useEffect(() => {
    setExistingLinks(links);
  }, [links]);

  // Copy Logic
  const handleCopyClick = (url: string, index: number) => {
    setCopiedIndex(index);
    copyToClipboard(url);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 3000);
  };

  const handleCopyFolder = (index: number) => {
    const linksInFolder = folders[index].links;
    const joinedLinks = linksInFolder.map((link: Links) => link.url).join("\n");
    if (linksInFolder.length) {
      copyToClipboard(joinedLinks);
    }
  };

  const handleBulkCopy = useCallback(() => {
    if (isFolderLinks) {
      handleBulkCopyItems(folders, setFolders, "link", openFolderIndex, true);
      setShowCheckboxes(false);
    } else {
      handleBulkCopyItems(links, setLinks, "link");
      setShowCheckboxes(false);
    }
  }, [folders, links, isFolderLinks, openFolderIndex, setFolders, setLinks]);

  const handleBulkCopyFolder = useCallback(() => {
    handleBulkCopyItems(folders, setFolders, "folder");
    setShowFolderCheckboxes(false);
  }, [folders, setShowFolderCheckboxes, setFolders]);

  // Delete Logic
  const handleDelete = useCallback(
    (index: number) => {
      if (isFolder) {
        handleDeleteItems(folders, setFolders, index);
      } else if (isFolderLinks) {
        const updatedFolders = [...folders];
        openFolderIndex &&
          updatedFolders[openFolderIndex].links.splice(index, 1);
        setFolders(updatedFolders);
      } else {
        handleDeleteItems(links, setLinks, index);
      }
      toast.success("Deleted");
    },
    [
      isFolder,
      isFolderLinks,
      openFolderIndex,
      folders,
      links,
      setFolders,
      setLinks,
    ]
  );

  const handleBulkDelete = useCallback(
    (isModal?: boolean) => {
      const filterCriteria = (link: Links) =>
        menu === "Unnamed"
          ? !link.url_name && link.selected
          : link.url_name && link.selected;

      handleBulkDeleteItems(
        menu === "Unnamed" ? unnamedLinks : namedLinks,
        links,
        setLinks,
        filterCriteria,
        openModal,
        menu,
        isModal && isModal
      );

      setShowCheckboxes(false);
    },
    [
      links,
      namedLinks,
      unnamedLinks,
      setLinks,
      openModal,
      setShowCheckboxes,
      menu,
    ]
  );

  const handleDeleteLinkInFolder = () => {
    const filterCriteria = (link: Links) => link.selected || false;
    handleBulkDeleteItems(
      openFolderIndex ? folders[openFolderIndex].links : null,
      null,
      (newLinks: Links[]) => {
        const newFolders = [...folders];
        if (openFolderIndex) newFolders[openFolderIndex].links = newLinks;
        setFolders(newFolders);
      },
      filterCriteria,
      openModal,
      null,
      true
    );
    setShowCheckboxes(false);
  };

  const handleBulkDeleteFolder = useCallback(
    (isModal?: boolean) => {
      const filterCriteria = (folder: Folders) => folder.selected;

      handleBulkDeleteItems(
        folders,
        null,
        setFolders,
        filterCriteria,
        openModal,
        null,
        isModal && isModal
      );

      setShowFolderCheckboxes(false);
      setIsFolderLinks(false);
    },
    [folders, setFolders, openModal, setShowFolderCheckboxes]
  );

  // Pin Logic
  const handlePinClick = useCallback(
    (index: number) => {
      if (isFolder) {
        setFolders((prevFolders) => {
          const updatedFolders = togglePin(prevFolders, index);
          return updatedFolders;
        });
      } else {
        setLinks((prevLinks) => {
          const updatedLinks = togglePin(prevLinks, index);
          return updatedLinks;
        });
      }
    },
    [setLinks, setFolders, isFolder]
  );
  console.log("OpenfolderIndextttttttttttttttt", openFolderIndex);
  // Select Logic
  const handleSelectLinkInFolder = (index: number) => {
    setFolders((prevFolders) => {
      const newFolders = toggleSelection(
        prevFolders,
        index,
        false,
        openFolderIndex
      );
      return newFolders;
    });
  };
  const handleSelect = (index: number, isModal?: boolean) => {
    if ((isFolder && !modalText.includes("Folder")) || isModal) {
      console.log("isFolder");
      let newFolders = [...folders];
      const folder = { ...newFolders[index] };
      console.log("folderxxxxxxxxxxxxxxxxxxxxxxxx", folder);
      folder.selected = !folder.selected;
      console.log("folderfrrdaxxxxxxxxxxxxx", folder);
      newFolders[index] = folder;
      setFolders(newFolders);
    } else {
      if (isFolder) {
        console.log("isFolder, setExistingLinks");
        setExistingLinks((prevLinks) => {
          const newLinks = toggleSelection(prevLinks, index, true, null);
          return newLinks;
        });
      } else {
        console.log("setLinks");
        setLinks((prevLinks) => {
          const newLinks = toggleSelection(prevLinks, index);
          return newLinks;
        });
      }
    }
  };
  const handleSelectAllLinksInFolder = () => {
    const updatedFolders = toggleBulkSelection(
      folders,
      false,
      null,
      false,
      true,
      openFolderIndex
    );
    setFolders(updatedFolders);
    setIsFolder(false);
  };

  const handleSelectAllFolders = () => {
    const updatedFolders = toggleBulkSelection(
      folders,
      false,
      null,
      true,
      false,
      null
    );
    setFolders(updatedFolders);
  };

  const handleSelectAllLinks = () => {
    const updatedLinks = toggleBulkSelection(
      menu === "Named" ? namedLinks : unnamedLinks,
      false,
      menu,
      false,
      false,
      null
    );
    let update: Links[] = [];
    if (menu === "Named") {
      update = [...unnamedLinks, ...updatedLinks];
    } else {
      update = [...updatedLinks, ...namedLinks];
    }
    setLinks(update);
  };

  const handleSelectClick = (isSelectClick: boolean) => {
    if (isFolderLinks) {
      // Handle selection for links within a specific folder
      const updatedFolders = toggleBulkSelection(
        folders,
        isSelectClick,
        null,
        false,
        true,
        openFolderIndex
      );
      setFolders(updatedFolders);

      setIsFolder(false);
    } else if (isFolder) {
      // Handle selection for folders
      const updatedFolders = toggleBulkSelection(
        folders,
        isSelectClick,
        null,
        true,
        false,
        null
      );
      setFolders(updatedFolders);
    } else {
      // Handle selection for global links
      const updatedLinks = toggleBulkSelection(
        links,
        isSelectClick,
        null,
        false,
        false,
        null
      );
      setLinks(updatedLinks);
    }
  };
  const handleAddLinksToFolder = () => {
    console.log("hey");
    const filteredLinks = links.filter((link) => link.selected);
    const selectedFolder = folders.filter((folder) => folder.selected);
    console.log("selectedFolder", selectedFolder);
    if (selectedFolder) {
      const updatedFolders = folders.map((folder, index) => {
        if (folder.selected) {
          return {
            ...folder,
            links: [...filteredLinks, ...folder.links].map((link) => {
              return { ...link, selected: false };
            }),
            selected: false,
          };
        }
        return folder;
      });

      setLinks((prevLinks) =>
        prevLinks.filter((link) => !filteredLinks.includes(link))
      );
      setFolders(updatedFolders);
      handleClose();
      setShowCheckboxes(false);
      goTo(Folder);
      setActive("Folders");
    }
  };

  return (
    <LinkContext.Provider
      value={{
        handleBulkCopyFolder,
        handleBulkDelete,
        showCheckboxes,
        setShowCheckboxes,
        handleSelect,
        handlePinClick,
        handleDelete,
        handleBulkCopy,
        handleCopyFolder,
        copiedIndex,
        setCopiedIndex,
        isFolder,
        isFolderLinks,
        setIsFolder,
        setIsFolderLinks,
        handleCopyClick,
        handleBulkDeleteFolder,
        handleSelectAllLinks,
        namedLinks,
        unnamedLinks,
        handleSelectAllFolders,
        handleDeleteLinkInFolder,
        handleSelectAllLinksInFolder,
        handleSelectClick,
        handleAddLinksToFolder,
        existingLinks,
        setExistingLinks,
        handleSelectLinkInFolder,
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};
