import { useCallback } from 'react';
import { useLinkContext } from '../context/LinkContext';
import { useAppContext } from '../context/AppContext';
import { useFolderContext } from '../context/FolderContext';
import toast from "react-hot-toast";

const useSelectOptions = () => {
  const { menu, setFolders, setLinks } = useAppContext();
  const {
    handleBulkCopy,
    handleBulkDelete,
    isFolder,
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
  } = useLinkContext();

  const { setShowFolderCheckboxes } = useFolderContext();

  const handleDelete = (isModal) => {
    console.log(isFolder, isFolderLinks); // Debug log
    console.log('Delete triggered with isModal:', isModal); // Debug log
    if (isFolder) {
      console.log('delete all folders');
      handleBulkDeleteFolder(isModal);
    } else if (isFolderLinks) {
      console.log('delete all links in folder');
      handleDeleteLinkInFolder(isModal);
    } else {
      console.log('delete all links');
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
      handleSelectAllLinks(menu);
    }
  };

  const handleCancelSelect = () => {
    if (isFolder) {
      setShowFolderCheckboxes(false);
      setFolders((prevFolders) =>
        prevFolders.map((folder) => {
          const newFolder = { ...folder };
          delete newFolder.selected;
          return newFolder;
        })
      );
      setIsFolder(false);
      setIsFolderLinks(false);
    } else {
      setShowCheckboxes(false);
      if (isFolderLinks) {
        setFolders((prevFolders) =>
          prevFolders.map((folder) => {
            const newFolder = { ...folder };
            newFolder.links = newFolder.links.map((link) => {
              const newLink = { ...link };
              delete newLink.selected;
              return newLink;
            });
            return newFolder;
          })
        );
        setIsFolder(false);
        setIsFolderLinks(false);
      } else {
        setLinks((prevLinks) =>
          prevLinks.map((link) => {
            const newLink = { ...link };
            delete newLink.selected;
            return newLink;
          })
        );
      }
    }
  };

  return { handleDelete, handleCopy, handleClickSelectAll, handleCancelSelect };
};

export default useSelectOptions;
