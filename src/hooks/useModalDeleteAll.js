import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useLinkContext } from "../context/LinkContext";
import { useFolderContext } from "../context/FolderContext";
import { setToLocalStorage } from "../utils/storage";
const useModalDeleteAll = () => {
  const { handleClose, setLinks, links, folders, setFolders } = useAppContext();
  const { setShowCheckboxes, isFolder, isFolderLinks } = useLinkContext();
  const { setShowFolderCheckboxes, index: folderIndex } = useFolderContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFolder) {
      const updatedFolders = folders.filter((folder) => !folder.selected);
      setFolders(updatedFolders);
      localStorage.setItem("Folders", JSON.stringify(updatedFolders));
      setShowFolderCheckboxes(false);
    } else if (isFolderLinks) {
      const updatedFolderLinks = folders[folderIndex].links.filter(
        (link) => !link.selected
      );
      setFolders((prevFolders) => {
        const newFolders = [...prevFolders];
        newFolders[folderIndex].links = updatedFolderLinks;
        setFolders(newFolders);
        setToLocalStorage("Folders", newFolders);
      });
    } else {
      const updatedLinks = links.filter((link) => !link.selected);
      setLinks(updatedLinks);
      localStorage.setItem("Links", JSON.stringify(updatedLinks));
      setShowCheckboxes(false);
    }
    handleClose();
    toast.success("Deleted successfully!");
  };

  const handleCancel = () => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => {
        const newLink = { ...link };
        delete newLink.selected;
        return newLink;
      })
    );
    setFolders((prevFolders) =>
      prevFolders.map((folder) => {
        const newFolder = { ...folder };
        delete newFolder.selected;
        return newFolder;
      })
    );
    setShowCheckboxes(false);
    handleClose();
  };
  return {
    handleSubmit,
    handleCancel,
  };
};

export default useModalDeleteAll;
