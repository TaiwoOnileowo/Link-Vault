import { useState } from "react";
import { useAppContext } from "../context";
import { useFolderContext } from "../context";
import { updateStorage } from "../utils/api";
import { folderIcons } from "../../public/foldericons";
import toast from "react-hot-toast";
const useModalIcon = () => {
  const { setFolders, folders, handleClose } = useAppContext();

  const { index: folderIndex } = useFolderContext();
  const initialIndex = folderIcons.indexOf(folders[folderIndex].folder_icon);
  const [index, setIndex] = useState(initialIndex === -1 ? 8 : initialIndex);

  const handleClick = (icon, index) => {
    setIndex(index);
    const updatedFolders = [...folders];
    updatedFolders[folderIndex].folder_icon = icon;
    setFolders(updatedFolders);
  };
  const handleClickDone = () => {
    updateStorage("Folders", folders);
    handleClose();
    toast.success("Icon Changed")
  };
  return { handleClick, index , handleClickDone};
};

export default useModalIcon;
