import { useAppContext } from "../context";
import toast from "react-hot-toast";
import { useLinkContext } from "../context";
import { updateStorage } from "../utils/api";
import { getInitialLinks } from "../utils/api";
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
    if (modalText.includes("Add Links To Folder")) {
      updatedFolders[editIndex].folder_name = folderInputs.folder_name;
      updatedFolders[editIndex].links = [...folderInputs.links];
      setFolders(updatedFolders);
      updateStorage("Folders", updatedFolders);
      toast.success("Links Added successfully!");
    } else {
      updatedFolders = [folderInputs, ...folders];
      const sortedUpdatedFolders = updatedFolders.sort(
        (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
      );
      setFolders(sortedUpdatedFolders);
      updateStorage("Folders", sortedUpdatedFolders);
    }
    handleClose();
    setFolderInputs({
      folder_name: "",
      links: [],
    });
    setShowCheckboxes(false);
    setMenu("Unnamed");
  };

  const deleteLink = async (index) => {
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
      const updatedLinks = (await getInitialLinks()) || [];
      updatedLinks.splice(linkToRemove.originalIndex, 0, {
        ...linkToRemove,
        selected: false,
      });
     updateStorage("Links", updatedLinks);
    }
  };
  const AddLinks = () => {
    setMenu("Add Links");
  };
  return { handleClick, deleteLink, AddLinks };
};

export default useLinksAddedToFolder;
