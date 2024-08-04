import { useAppContext } from "../context";
import toast from "react-hot-toast";
import { useLinkContext } from "../context";
import {} from "../utils/api";
import { folderIcons } from "../../public/foldericons";
import useAddLinksToFolder from "./useAddLinksToFolder";
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

  const { updatedLinks } = useAddLinksToFolder();
  const { setShowCheckboxes, setExistingLinks } = useLinkContext();
  console.log("Edit Index", editIndex);
  const handleClick = () => {
    let updatedFolders = [...folders];
    if (modalText.includes("Save Links To Folder")) {
      updatedFolders[editIndex].folder_name = folderInputs.folder_name;
      updatedFolders[editIndex].links = [...folderInputs.links];
      setFolders(updatedFolders);

      toast.success("Links Added successfully!");
    } else {
      const deselectedLinks = updatedLinks.map((link: any) => {
        const newLink = { ...link };
        delete newLink.selected;
        return newLink;
      });
      setLinks(deselectedLinks);
      folderInputs.folder_icon = folderIcons[8];
      updatedFolders = [folderInputs, ...folders];
      const sortedUpdatedFolders = updatedFolders.sort(
        (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
      );
      setFolders(sortedUpdatedFolders);
    }
    handleClose();
    setFolderInputs({
      folder_name: "",
      links: [],
    });
    setShowCheckboxes(false);
    setMenu("Unnamed");
  };

  const deleteLink = async (index:number) => {
    const linkToRemove = folderInputs.links[index];
    const newFolderInputs = [...folderInputs.links];
    newFolderInputs.splice(index, 1);

    setFolderInputs((prevFolderInputs:any) => ({
      ...prevFolderInputs,
      links: newFolderInputs,
    }));

    setExistingLinks((prevLinks:Array<any>) => {
      const newLinks = [...prevLinks];
      newLinks.splice(linkToRemove.originalIndex, 0, {
        ...linkToRemove,
        selected: false,
      });
      return newLinks;
    });
  };
  const AddLinks = () => {
    setMenu("Add Links");
  };
  return { handleClick, deleteLink, AddLinks };
};

export default useLinksAddedToFolder;
