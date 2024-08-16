import { useState } from "react";
import { useAppContext, useModalContext } from "../context";
import {} from "../utils/api";
import { folderIcons } from "../../public/foldericons";
import toast from "react-hot-toast";
import { AppContextType, ModalContextType } from "../types";
const useModalIcon = () => {
  const { setFolders, folders } = useAppContext() as AppContextType;
  const { handleClose, clickedIndex } = useModalContext() as ModalContextType;
  const initialIndex = clickedIndex !== null ? folderIcons.indexOf(folders[clickedIndex].folder_icon) : -1;
  const [index, setIndex] = useState(initialIndex === -1 ? 8 : initialIndex);

  const handleClick = (icon:string, index: number) => {
    setIndex(index);
    const updatedFolders = [...folders];
    if (clickedIndex !== null) {
      updatedFolders[clickedIndex].folder_icon = icon;
      setFolders(updatedFolders);
    }
  };
  const handleClickDone = () => {
    handleClose();
    toast.success("Icon Changed");
  };
  return { handleClick, index, handleClickDone };
};

export default useModalIcon;
