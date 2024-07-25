import {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import { useAppContext } from "./AppContext.jsx";
import { useFolderContext } from "./FolderContext.jsx";
import { copyToClipboard } from "../utils/clipboardUtils.js";
import { setToLocalStorage } from "../utils/storage.js";
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
import { FaSadCry } from "react-icons/fa";
const LinkContext = createContext();

export const LinkProvider = ({ children }) => {
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
  } = useAppContext();
  const { setShowFolderCheckboxes, index: folderIndex } = useFolderContext();
  const { sortedNamedLinks, sortedUnnamedLinks } = useSortedLinks();
  const [copiedIndex, setCopiedIndex] = useState(null);

  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [isFolder, setIsFolder] = useState(false);
  const [isFolderLinks, setIsFolderLinks] = useState(false);

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
  }, [folders, links, isFolderLinks, folderIndex]);
  const handleBulkCopyFolder = useCallback(() => {
    handleBulkCopyItems(folders, setFolders, "folder");
    setShowFolderCheckboxes(false);
  }, [folders, setShowFolderCheckboxes]);

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
          setToLocalStorage,
          "Folders"
        );
      } else if (isFolderLinks) {
        const updatedFolders = [...folders];
        updatedFolders[folderIndex].links.splice(index, 1);
        setToLocalStorage("Folders", updatedFolders);
        setFolders(updatedFolders);
      } else {
        handleDeleteItems(
          links,
          setLinks,
          "link",
          index,
          setToLocalStorage,
          "Links"
        );
      }
      toast.success("Deleted");
    },
    [
      isFolder,
      isFolderLinks,
      folderIndex,
      folders,
      links,
      setFolders,
      setLinks,
      setToLocalStorage,
    ]
  );
  const handleBulkDelete = useCallback(() => {
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
      setToLocalStorage,
      "Links",
      filterCriteria,
      openModal,
      whatToRetainFilterCriteria,
      false
    );

    setShowCheckboxes(false);
  }, [
    links,
    sortedNamedLinks,
    sortedUnnamedLinks,
    setLinks,
    setToLocalStorage,
    openModal,
    setShowCheckboxes,
  ]);
  const handleDeleteLinkInFolder = (isModal) => {
    const filterCriteria = (link) => link.selected;
    handleBulkDeleteItems(
      folders[folderIndex].links,
      null,
      (newLinks) => {
        const newFolders = [...folders];
        newFolders[folderIndex].links = newLinks;
        setFolders(newFolders);
        setToLocalStorage("Folders", newFolders);
      },
      setToLocalStorage,
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
        setToLocalStorage,
        "Folders",
        filterCriteria,
        openModal,
        null,
        isModal && isModal
      );

      setShowFolderCheckboxes(false);
      setIsFolderLinks(false);
    },
    [folders, setFolders, setToLocalStorage, openModal, setShowFolderCheckboxes]
  );
  ////////////// DELETE LOGIC END /////////////

  ////////////// PIN LOGIC START /////////////
  const handlePinClick = useCallback(
    (index) => {
      console.log(isFolder);
      if (isFolder) {
        setFolders((prevFolders) => {
          const updatedFolders = togglePin(prevFolders, index, "folder");
          setToLocalStorage("Folders", updatedFolders);
          return updatedFolders;
        });
      } else {
        setLinks((prevLinks) => {
          const updatedLinks = togglePin(prevLinks, index, "link");
          setToLocalStorage("Links", updatedLinks);
          return updatedLinks;
        });
      }
    },
    [setLinks, setFolders, isFolder, setToLocalStorage]
  );
  ////////////// PIN LOGIC END /////////////

  ////// SELECT LOGIC START ///////////
  const handleSelect = (index, isModal) => {
    if ((isFolder && !modalText.includes("Folder")) || isModal) {
      setFolders((prevFolders) => {
        const newFolders = toggleSelection(prevFolders, index, true, null);
        console.log("After folder selection:", newFolders);
        return newFolders;
      });
    } else if (isFolderLinks && !modalText.includes("Folder")) {
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
      setLinks((prevLinks) => {
        const newLinks = toggleSelection(prevLinks, index);
        console.log("After global link selection:", newLinks);
        return newLinks;
      });
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
    setToLocalStorage("Folders", updatedFolders);
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
    setToLocalStorage("Folders", updatedFolders);
  };

  const handleSelectAllLinks = (menu) => {
    const updatedLinks = toggleBulkSelection(links, false, menu);
    setLinks(updatedLinks);
    setToLocalStorage("Links", updatedLinks);
  };
  const handleSelectClick = (isSelectClick) => {
    if (isFolderLinks) {
      const updatedFolders = toggleBulkSelection(
        folders,
        isSelectClick,
        null,
        false,
        true,
        folderIndex
      );
      setFolders(updatedFolders);
      setToLocalStorage("Folders", updatedFolders);
    } else if (isFolder) {
      const updatedFolders = toggleBulkSelection(
        folders,
        isSelectClick,
        null,
        true
      );
      setFolders(updatedFolders);
      setToLocalStorage("Folders", updatedFolders);
    } else {
      const updatedLinks = toggleBulkSelection(links, isSelectClick);
      setLinks(updatedLinks);
      setToLocalStorage("Links", updatedLinks);
    }
  };
  ////////// SELECT LOGIC END ///////////

  /////////////// ADD LINKS TO FOLDER LOGIC START /////////////
  const handleAddLinksToFolder = () => {
    let linksToAdd = [];
    if (inputs.selected) {
      linksToAdd = [{ ...inputs, selected: false }];
    } else {
      linksToAdd = links.filter((link) => link.selected);
    }
    console.log(linksToAdd);

    const updatedFolders = [...folders];
    updatedFolders.map((folder) => {
      if (folder.selected) {
        folder.links = [...linksToAdd, ...folder.links];
      }
      return folder;
    });
    const updatedLinks = [...links];
    linksToAdd.forEach((link) => {
      updatedLinks.splice(link, 1);
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

    const deselectedLinks = toggleBulkSelection(
      updatedLinks,
      true,
      menu,
      false,
      false,
      null
    );
    setFolders(deselectedFolders);
    if (!inputs.selected) {
      setLinks(deselectedLinks);
      setToLocalStorage("Links", deselectedLinks);
    }
    setToLocalStorage("Folders", deselectedFolders);
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
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};

export const useLinkContext = () => useContext(LinkContext);
