import { useLinkContext, useModalContext } from "../context";
import { useAppContext, useFolderContext } from "../context";

import { FolderContextType, Links, ModalContextType } from "../types";

import useSortedLinks from "./useSortedLinks";
const useSelectOptions = () => {
  const appcontext = useAppContext();
  const linkcontext = useLinkContext();
  if (!appcontext || !linkcontext) {
    throw new Error("useSortedLinks must be used within an AppProvider");
  }

  const { menu, route } = appcontext;
  const { openModal } = useModalContext() as ModalContextType;
  const { setShowFolderCheckboxes } = useFolderContext() as FolderContextType;
  const {
    handleBulkCopy,
    handleBulkDelete,
    handleBulkCopyFolder,
    handleBulkDeleteFolder,
    handleSelectAllFolders,
    handleDeleteLinkInFolder,
    isFolderLinks,
    handleSelectAllLinksInFolder,
    setIsFolder,
    setIsFolderLinks,
    setShowCheckboxes,
    handleSelectAllLinks,
    isFolder,
    handleSelectClick,
  } = linkcontext;
  const { sortedNamedLinks, sortedUnnamedLinks } = useSortedLinks();

  const handleDelete = (isModal: boolean) => {
    console.log(isFolder, isFolderLinks); // Debug log
    console.log("Delete triggered with isModal:", isModal); // Debug log
    if (isFolder) {
      console.log("delete all folders");
      handleBulkDeleteFolder(isModal);
    } else if (isFolderLinks) {
      console.log("delete all links in folder");
      handleDeleteLinkInFolder();
    } else {
      console.log("delete all links");
      handleBulkDelete(isModal);
    }
  };

  const handleCopy = () => {
    if (isFolder) {
      handleBulkCopyFolder();
    } else {
      handleBulkCopy();
    }
  };

  const handleClickSelectAll = () => {
    console.log(isFolder, isFolderLinks); // Debug log
    if (isFolder) {
      handleSelectAllFolders();
    } else if (isFolderLinks) {
      handleSelectAllLinksInFolder();
    } else {
      handleSelectAllLinks();
    }
  };

  const handleCancelSelect = () => {
    setShowCheckboxes(false);
    setShowFolderCheckboxes(false);
    handleSelectClick(true);
    setIsFolder(false);
    setIsFolderLinks(false);
  };
  const handleShowAddFolder = (linksAdded: Links | null) => {
    openModal(
      "Save to Folder",
      linksAdded ? linksAdded : null,
      null,
      null,
      isFolder
    );
  };
  let activeItems: Links[] = [];
  if (route === "Home") {
    if (menu === "Unnamed") {
      activeItems = sortedUnnamedLinks;
    } else if (menu == "Named") {
      activeItems = sortedNamedLinks;
    }
  }

  return {
    handleShowAddFolder,
    handleDelete,
    handleCopy,
    handleClickSelectAll,
    handleCancelSelect,
    activeItems,
  };
};

export default useSelectOptions;
