import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useLinkContext } from "../context/LinkContext";
const useLinksAddedToFolder = () => {
  const {
    setMenu,
    setFolderInputs,
    setFolders,
    folders,
    setLinks,
    handleClose,
    modalText,
    editIndex,
    folderInputs,
  } = useAppContext();
  const { setShowCheckboxes } = useLinkContext();
  const handleClick = () => {
    let updatedFolders = [...folders];
    if (modalText.includes("Edit Folder")) {
      updatedFolders[editIndex].folder_name = folderInputs.folder_name;
      updatedFolders[editIndex].links = [...folderInputs.links];
      setFolders(updatedFolders);
      localStorage.setItem("Folders", JSON.stringify(updatedFolders));
      toast.success("Edited successfully!");
    } else {
      updatedFolders = [folderInputs, ...folders];
      const sortedUpdatedFolders = updatedFolders.sort(
        (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
      );
      setFolders(sortedUpdatedFolders);
      localStorage.setItem("Folders", JSON.stringify(sortedUpdatedFolders));
    }
    handleClose();
    setFolderInputs({
      folder_name: "",
      links: [],
    });
    setShowCheckboxes(false);
    setMenu("Unnamed");
  };

  const deleteLink = (index) => {
    const linkToRemove = folderInputs.links[index];
    const newFolderInputs = [...folderInputs.links];
    newFolderInputs.splice(index, 1);

    setFolderInputs((prevFolderInputs) => ({
      ...prevFolderInputs,
      links: newFolderInputs,
    }));
    if (linkToRemove.selected) {
      setLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks.splice(linkToRemove.originalIndex, 0, {
          ...linkToRemove,
          selected: false,
        });
        return newLinks;
      });
      const updatedLinks = JSON.parse(localStorage.getItem("Links")) || [];
      updatedLinks.splice(linkToRemove.originalIndex, 0, {
        ...linkToRemove,
        selected: false,
      });
      localStorage.setItem("Links", JSON.stringify(updatedLinks));
    }
  };
  const AddLinks = () => {
    setMenu("Add Links");
  };
  return { handleClick, deleteLink, AddLinks };
};

export default useLinksAddedToFolder;
