
import { useLinkContext } from '../context';
import { useAppContext } from '../context';
import { useFolderContext } from '../context';


const useSelectOptions = () => {
  const { menu, setFolders, setLinks , openModal} = useAppContext();
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
  const handleShowAddFolder = (linksAdded) => {
    openModal("Save to Folder", linksAdded ? linksAdded : null, null, null);
  };

  return { handleShowAddFolder,handleDelete, handleCopy, handleClickSelectAll, handleCancelSelect };
};

export default useSelectOptions;
