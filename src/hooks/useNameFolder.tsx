import toast from "react-hot-toast";
import { folderIcons } from "../../public/foldericons";
import { useLinkContext, useModalContext } from "../context";
import { useAppContext } from "../context";
import { AppContextType, LinkContextProps, ModalContextType } from "../types";

import { useState } from "react";
const useNameFolder = () => {
  const {
    setMenu,
    folders,
    setFolders,

    setInputError,
  } = useAppContext() as AppContextType;
  const {
    folderInputs,
    modalText,
    handleClose,
    setFolderInputs,
    clickedIndex,
  } = useModalContext() as ModalContextType;
  const [error, setError] = useState<string | null>(null);
  const { setShowCheckboxes } = useLinkContext() as LinkContextProps;
  let updatedFolders = [...folders];
  const modalMounted = clickedIndex > -1;
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (folderInputs.folder_name && !error) {
      if (modalText.includes("Rename Folder")) {
        setFolders(updatedFolders);
        handleClose();
        toast.success("Folder renamed successfully");
        setFolderInputs({
          folder_name: "",
          links: [],
          folder_icon: folderIcons[8],
        });
        setShowCheckboxes(false);
        setMenu("Unnamed");
      } else {
        setMenu("Add Links");
      }
    }
  };

  const renameFolder = (newFolderInputs) => {
    updatedFolders = [...folders];
    if (clickedIndex !== null) {
      updatedFolders[clickedIndex].folder_name = newFolderInputs.folder_name;
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newFolderInputs = {
      ...folderInputs,
      [e.target.name]: e.target.value,
    };
    setFolderInputs(newFolderInputs);

    const alreadyExists = folders.some(
      (folder) => folder.folder_name === e.target.value
    );

    if (alreadyExists) {
      setError("Folder name already exists");
      setInputError(true);
    } else {
      setError(null);
      setInputError(false);
      if (modalMounted) {
        renameFolder(newFolderInputs);
      }
    }
  };

  return { handleClick, handleChange, error };
};

export default useNameFolder;
