import React, {
  useState,
  createContext,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { useAppContext } from "./index";
import { useFolderContext } from "./index";
import { copyToClipboard } from "../utils/clipboardUtils";
import { toggleSelection, toggleBulkSelection } from "../utils/selectionUtils";
import { togglePin } from "../utils/pinUtils";
import { handleBulkCopyItems } from "../utils/copyBulkItems";
import { handleBulkDeleteItems, handleDeleteItems } from "../utils/deleteUtils";

import { LinkContextProps, Links, Folders, AppContextType } from "../types";

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
    openModal,
    folders,
    setFolders,
    modalText,
    handleClose,
    inputs,
    setInputs,
    route,
  } = useAppContext() as AppContextType;
  const { setShowFolderCheckboxes, openFolderIndex } = useFolderContext();
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
      folders[openFolderIndex].links,
      null,
      (newLinks: Links[]) => {
        const newFolders = [...folders];
        newFolders[openFolderIndex].links = newLinks;
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
        setFolders((prevFolders: Folders[]) => {
          const updatedFolders = togglePin(prevFolders, index);
          return updatedFolders;
        });
      } else {
        setLinks((prevLinks: Links[]) => {
          const updatedLinks = togglePin(prevLinks, index);
          return updatedLinks;
        });
      }
    },
    [setLinks, setFolders, isFolder]
  );

  // Select Logic
  const handleSelect = useCallback(
    (index: number, isModal?: boolean) => {
      if ((isFolder && !modalText.includes("Folder")) || isModal) {
        console.log("isFolder");
        setFolders((prevFolders: Folders[]) => {
          const newFolders = toggleSelection(prevFolders, index, true, null);
          return newFolders;
        });
      } else if (isFolderLinks && !modalText.includes("Folder")) {
        console.log("isFolderLinks");
        setFolders((prevFolders: Folders[]) => {
          const newFolders = toggleSelection(
            prevFolders,
            index,
            false,
            openFolderIndex
          );
          return newFolders;
        });
      } else {
        if (isFolder) {
          console.log("isFolder, setExistingLinks");
          setExistingLinks((prevLinks: Links[]) => {
            const newLinks = toggleSelection(prevLinks, index, true, null);
            return newLinks;
          });
        } else {
          console.log("setLinks");
          setLinks((prevLinks: Links[]) => {
            const newLinks = toggleSelection(prevLinks, index);
            return newLinks;
          });
        }
      }
    },
    []
  );

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
    const updatedLinks: Links[] = toggleBulkSelection(
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
    const filteredLinks = links.filter((link) => link.selected);
    const selectedFolder = folders[openFolderIndex];

    if (selectedFolder) {
      const updatedFolders = folders.map((folder, index) => {
        if (index === openFolderIndex) {
          return {
            ...folder,
            links: [...folder.links, ...filteredLinks],
          };
        }
        return folder;
      });

      setFolders(updatedFolders);
      setLinks((prevLinks) =>
        prevLinks.filter((link) => !filteredLinks.includes(link))
      );
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
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};
