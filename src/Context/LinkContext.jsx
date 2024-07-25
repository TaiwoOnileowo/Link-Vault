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
  const { menu, links, setLinks, openModal, folders, setFolders, modalText } =
    useAppContext();
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
  }, [links, folders, isFolderLinks, folderIndex, setShowCheckboxes]);

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
  const handleBulkDelete = useCallback(
    (isModal) => {
      console.log(isModal);
      const filterCriteria = (link) => {
        return menu === "Unnamed"
          ? !link.url_name && link.selected
          : link.url_name && link.selected;
      };
      console.log(isModal);
      const whatToRetainFilterCriteria = (link) => {
        return menu === "Unnamed" ? link.url_name : !link.url_name;
      };
      handleBulkDeleteItems(
        menu === "Unnamed" ? sortedUnnamedLinks : sortedNamedLinks,
        links,
        setLinks,
        setToLocalStorage,
        "Links",
        filterCriteria,
        openModal,
        whatToRetainFilterCriteria,
        isModal && isModal
      );

      setShowCheckboxes(false);
    },
    [links, setLinks, setToLocalStorage, openModal, setShowCheckboxes]
  );

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
  const handleSelect = (index) => {
    if (isFolder && !modalText.includes("Folder")) {
      setFolders((prevFolders) => {
        const newFolders = toggleSelection(prevFolders, index, true);
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
    setFolders((prevFolders) => {
      const updatedFolders = toggleBulkSelection(
        prevFolders,
        false,
        null,
        false,
        true,
        folderIndex
      );
      return updatedFolders;
    });
    setIsFolder(false);
  };

  const handleSelectAllFolders = () => {
    setFolders((prevFolders) =>
      toggleBulkSelection(prevFolders, false, null, true, false, null)
    );
  };

  const handleSelectAllLinks = (menu) => {
    // if (menu === "Unnamed" || menu === "Named") {
    setLinks((prevLinks) =>
      toggleBulkSelection(prevLinks, false, menu, false, false, null)
    );
    // }
    // } else {
    //   console.log("ghey")
    //   setFolders((prevFolders) =>
    //     toggleBulkSelection(prevFolders, false, null, true, false, null)
    //   );
    // }
  };
  const handleSelectClick = (isSelectClick) => {
    if (isFolderLinks) {
      // Handle selection for links within a specific folder
      setFolders((prevFolders) =>
        toggleBulkSelection(
          prevFolders,
          isSelectClick ? isSelectClick : false,
          null,
          false,
          true,
          folderIndex
        )
      );
      setIsFolder(false);
    } else if (isFolder) {
      // Handle selection for folders
      setFolders((prevFolders) =>
        toggleBulkSelection(
          prevFolders,
          isSelectClick ? isSelectClick : false,
          null,
          true,
          false,
          null
        )
      );
    } else {
      // Handle selection for global links
      setLinks((prevLinks) =>
        toggleBulkSelection(
          prevLinks,
          isSelectClick ? isSelectClick : false,
          null,
          false,
          false,
          null
        )
      );
    }
  };
  ////////// SELECT LOGIC END ///////////

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
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};

export const useLinkContext = () => useContext(LinkContext);
