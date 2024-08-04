import { useState } from "react";
import { useAppContext } from "../context";
import {} from "../utils/api";
import { folderIcons } from "../../public/foldericons";
import toast from "react-hot-toast";
const useModalIcon = () => {
  const { setFolders, folders, handleClose, editIndex } = useAppContext();

  const initialIndex = folderIcons.indexOf(folders[editIndex].folder_icon);
  const [index, setIndex] = useState(initialIndex === -1 ? 8 : initialIndex);

  const handleClick = (icon, index: number) => {
    setIndex(index);
    const updatedFolders = [...folders];
    updatedFolders[editIndex].folder_icon = icon;
    setFolders(updatedFolders);
  };
  const handleClickDone = () => {
    handleClose();
    toast.success("Icon Changed");
  };
  return { handleClick, index, handleClickDone };
};

export default useModalIcon;
