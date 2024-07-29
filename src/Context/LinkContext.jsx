import { useState, createContext, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { updateStorage } from "../utils/api.js";
import { useAppContext } from "./index.jsx";
import { useFolderContext } from "./index.jsx";
import { copyToClipboard } from "../utils/clipboardUtils.js";

import {
  toggleSelection,
  toggleBulkSelection,
} from "../utils/selectionUtils.js";
import { togglePin } from "../utils/pinUtils.js";
import useSortedLinks from "../hooks/useSortedLinks.js";
import { handleBulkCopyItems } from "../utils/copyBulkItems.js";
import {
  handleBulkDeleteItems,
  handleDeleteItems,
} from "../utils/deleteUtils.js";

export const LinkContext = createContext();

import PropTypes from "prop-types";

export const LinkProvider = ({ children }) => {
  LinkProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
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
    route
  } = useAppContext();
  const { setShowFolderCheckboxes, index: folderIndex } = useFolderContext();
  const { sortedNamedLinks, sortedUnnamedLinks } = useSortedLinks();
  const [copiedIndex, setCopiedIndex] = useState(null);

  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [isFolder, setIsFolder] = useState(route === "Folder");
  const [isFolderLinks, setIsFolderLinks] = useState(false);
  const [existingLinks, setExistingLinks] = useState(links);


  useEffect(() => {
    setExistingLinks(links);
  }, [links]);

  
  ////////////// COPY LOGIC START /////////////
  const handleCopyClick = (url, index) => {
    setCopiedIndex(index);
    copyToClipboard(url);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 3000);
  };

  const handleCopyFolder = () => {
    const linksInFolder = folders[folderIndex].links;
    const joinedLinks = linksInFolder.map((link) => link.url).join("\n");
    if (linksInFolder.length) {
      copyToClipboard(joinedLinks);
    }
  };
  const handleBulkCopy = useCallback(() => {
    if (isFolderLinks) {
      handleBulkCopyItems(folders, setFolders, "link", folderIndex, true);
      setShowCheckboxes(false);
    } else {
      handleBulkCopyItems(links, setLinks, "link");
      setShowCheckboxes(false);
    }
  }, [folders, links, isFolderLinks, folderIndex, setFolders, setLinks]);
  const handleBulkCopyFolder = useCallback(() => {
    handleBulkCopyItems(folders, setFolders, "folder");
    setShowFolderCheckboxes(false);
  }, [folders, setShowFolderCheckboxes, setFolders]);



 

  ////////////// COPY LOGIC END /////////////

  ///////// DELETE LOGIC START ////////////
  const handleDelete = useCallback(
    (index) => {
      if (isFolder) {
        handleDeleteItems(
          folders,
          setFolders,
          "folder",
          index,
          updateStorage,
          "Folders"
        );
      } else if (isFolderLinks) {
        const updatedFolders = [...folders];
        updatedFolders[folderIndex].links.splice(index, 1);
        updateStorage("Folders", updatedFolders);
        setFolders(updatedFolders);
      } else {
        handleDeleteItems(
          links,
          setLinks,
          "link",
          index,
          updateStorage,
          "Links"
        );
      }
      toast.success("Deleted");
    },
    [isFolder, isFolderLinks, folderIndex, folders, links, setFolders, setLinks]
  );
  const handleBulkDelete = useCallback(
    (isModal) => {
      const filterCriteria = (link) =>
        menu === "Unnamed"
          ? !link.url_name && link.selected
          : link.url_name && link.selected;
      const whatToRetainFilterCriteria = (link) =>
        menu === "Unnamed" ? link.url_name : !link.url_name;

      handleBulkDeleteItems(
        menu === "Unnamed" ? sortedUnnamedLinks : sortedNamedLinks,
        links,
        setLinks,
        updateStorage,
        "Links",
        filterCriteria,
        openModal,
        whatToRetainFilterCriteria,
        isModal && isModal
      );

      setShowCheckboxes(false);
    },
    [
      links,
      sortedNamedLinks,
      sortedUnnamedLinks,
      setLinks,
      openModal,
      setShowCheckboxes,
      menu,
    ]
  );
  const handleDeleteLinkInFolder = () => {
    const filterCriteria = (link) => link.selected;
    handleBulkDeleteItems(
      folders[folderIndex].links,
      null,
      (newLinks) => {
        const newFolders = [...folders];
        newFolders[folderIndex].links = newLinks;
        setFolders(newFolders);
        updateStorage("Folders", newFolders);
      },
      updateStorage,
      "Folders",
      filterCriteria,
      openModal,
      null,
      true
    );
    setShowCheckboxes(false);
  };

  const handleBulkDeleteFolder = useCallback(
    (isModal) => {
      const filterCriteria = (folder) => folder.selected;

      handleBulkDeleteItems(
        folders,
        null,
        setFolders,
        updateStorage,
        "Folders",
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
  ////////////// DELETE LOGIC END /////////////

  ////////////// PIN LOGIC START /////////////
  const handlePinClick = useCallback(
    (index) => {
      console.log(isFolder);
      if (isFolder) {
        setFolders((prevFolders) => {
          const updatedFolders = togglePin(prevFolders, index);
          updateStorage("Folders", updatedFolders);
          return updatedFolders;
        });
      } else {
        setLinks((prevLinks) => {
          const updatedLinks = togglePin(prevLinks, index);
          updateStorage("Links", updatedLinks);
          return updatedLinks;
        });
      }
    },
    [setLinks, setFolders, isFolder]
  );
  ////////////// PIN LOGIC END /////////////

  ////// SELECT LOGIC START ///////////
  const handleSelect = (index, isModal) => {
    console.log("Index:", index);
    console.log("IsModal:", isModal);
    if ((isFolder && !modalText.includes("Folder")) || isModal) {
      console.log("Folder selection");
      setFolders((prevFolders) => {
        const newFolders = toggleSelection(prevFolders, index, true, null);
        console.log("After folder selection:", newFolders);
        return newFolders;
      });
    } else if (isFolderLinks && !modalText.includes("Folder")) {
      console.log("Link selection inside folder");
      setFolders((prevFolders) => {
        const newFolders = toggleSelection(
          prevFolders,
          index,
          false,
          folderIndex
        );
        console.log("After link selection inside folder:", newFolders);
        return newFolders;
      });
    } else {
      if (isFolder) {
        setExistingLinks((prevLinks) => {
          const newLinks = toggleSelection(prevLinks, index, true, null);
          console.log("After global link selection:", newLinks);
          return newLinks;
        });
      } else {
        setLinks((prevLinks) => {
          const newLinks = toggleSelection(prevLinks, index);
          console.log("After global link selection:", newLinks);
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
      folderIndex
    );
    setFolders(updatedFolders);
    setIsFolder(false);
    updateStorage("Folders", updatedFolders);
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
    console.log("Updated folders:", updatedFolders);
    updateStorage("Folders", updatedFolders);
  };

  const handleSelectAllLinks = () => {
    const updatedLinks = toggleBulkSelection(
      menu === "Named" ? sortedNamedLinks : sortedUnnamedLinks,
      false,
      menu,
      false,
      false,
      null
    );
    let update = [];
    if (menu === "Named") {
      update = [...sortedUnnamedLinks, ...updatedLinks];
    } else {
      update = [...sortedNamedLinks, ...updatedLinks];
    }
    setLinks(update);
    updateStorage("Links", update);
  };
  const handleSelectClick = (isSelectClick) => {
  
    if (isFolderLinks) {
      // Handle selection for links within a specific folder
      const updatedFolders = toggleBulkSelection(
        folders,
        isSelectClick,
        null,
        false,
        true,
        folderIndex
      );
      setFolders(updatedFolders);
      updateStorage("Folders", updatedFolders);
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
      updateStorage("Folders", updatedFolders);
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
      updateStorage("Links", updatedLinks);
    }
  };
  ////////// SELECT LOGIC END ///////////

  /////////////// ADD LINKS TO FOLDER LOGIC START /////////////
  const handleAddLinksToFolder = () => {
    let linksToAdd = [];
    if (inputs.selected) {
      linksToAdd = [{ ...inputs, selected: false }];
    } else {
      linksToAdd = links
        .filter((link) => link.selected)
        .map((link) => {
          return { ...link, selected: false };
        });
    }

    const updatedFolders = folders.map((folder) => {
      if (folder.selected) {
        folder.links = [...linksToAdd, ...folder.links];
      }
      return folder;
    });

    const updatedLinks = [...links];
    linksToAdd.forEach((link) => {
      const index = updatedLinks.findIndex((l) => l.url === link.url);
      if (index !== -1) {
        updatedLinks.splice(index, 1);
      }
    });

    setShowCheckboxes(false);
    const deselectedFolders = toggleBulkSelection(
      updatedFolders,
      true,
      null,
      true,
      false,
      null
    );

    if (!inputs.selected) {
      setLinks(updatedLinks);
      updateStorage("Links", updatedLinks);
    }
    setFolders(deselectedFolders);
    updateStorage("Folders", deselectedFolders);
    setInputs({
      url: "",
      url_name: "",
      tags: "",
    });
    handleClose();
  };

  /////////////// ADD LINKS  TO FOLDER LOGIC END /////////////

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
        sortedNamedLinks,
        sortedUnnamedLinks,
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
