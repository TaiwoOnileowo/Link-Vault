import { useAppContext, useModalContext } from "../context";
import toast from "react-hot-toast";
import { useLinkContext, useFolderContext } from "../context";
import { folderIcons } from "../../public/foldericons";
import useAddLinksToFolder from "./useAddLinksToFolder";
import {
  AppContextType,
  LinkContextProps,
  Links,
  ModalContextType,
  FolderContextType,
} from "../types";
const useLinksAddedToFolder = () => {
  const {
    setMenu,

    setFolders,
    folders,
    setLinks,
  } = useAppContext() as AppContextType;
  const {
    handleClose,

    setFolderInputs,
    clickedIndex,
    folderInputs,
  } = useModalContext() as ModalContextType;

  const { updatedLinks } = useAddLinksToFolder();
  const { setShowCheckboxes, setExistingLinks } =
    useLinkContext() as LinkContextProps;
  const { setOpenFolderIndex } = useFolderContext() as FolderContextType;
  const mountedModal = clickedIndex > -1;
  const handleClick = () => {
    let updatedFolders = [...folders];

    if (mountedModal) {
      updatedFolders[clickedIndex].folder_name = folderInputs.folder_name;
      updatedFolders[clickedIndex].links = [...folderInputs.links];

      setFolders(updatedFolders);
      setOpenFolderIndex(clickedIndex);
      toast.success("Links Added successfully!");
    } else {
      folderInputs.folder_icon = folderIcons[8];
      updatedFolders = [folderInputs, ...folders];
      const sortedUpdatedFolders = updatedFolders.sort(
        (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
      );
      setFolders(sortedUpdatedFolders);
      toast.success("Folder Created successfully!");
    }

    const deselectedLinks = updatedLinks.map((link: any) => {
      const newLink = { ...link };
      delete newLink.selected;
      return newLink;
    });

    setLinks(deselectedLinks);

    handleClose();
    setFolderInputs({
      folder_name: "",
      links: [],
      folder_icon: "",
    });
    setShowCheckboxes(false);
    setMenu("Unnamed");
  };

  const deleteLink = async (index: number) => {
    const linkToRemove = folderInputs.links[index];
    const newFolderInputs = [...folderInputs.links];
    newFolderInputs.splice(index, 1);

    setFolderInputs((prevFolderInputs: any) => ({
      ...prevFolderInputs,
      links: newFolderInputs,
    }));

    setExistingLinks((prevLinks: Array<any>) => {
      const newLinks: Links[] = [...prevLinks];
      newLinks.splice(linkToRemove.originalIndex || 0, 0, {
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
