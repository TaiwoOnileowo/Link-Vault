import { useLinkContext } from "../context/LinkContext";
import { useAppContext } from "../context/AppContext";
import { useFolderContext } from "../context/FolderContext";
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
    handleSelectAll,
  } = useLinkContext();

  const { setShowFolderCheckboxes } = useFolderContext();
  const handleDelete = () => {
    if (isFolder) {
      handleBulkDeleteFolder();
    } else if (isFolderLinks) {
      handleDeleteLinkInFolder();
    } else {
      handleBulkDelete(menu);
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
    if (isFolder) {
      handleSelectAllFolders();
    } else if (isFolderLinks) {
      handleSelectAllLinksInFolder();
    } else {
      handleSelectAll(menu);
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
