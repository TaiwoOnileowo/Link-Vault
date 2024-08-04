import { useLinkContext } from "../context";
import { useAppContext } from "../context";
import {} from "../utils/api";

import { useState } from "react";
const useNameFolder = () => {
  const {
    folderInputs,
    modalText,
    handleClose,
    setFolderInputs,
    setMenu,
    folders,
    setFolders,
    editIndex,
    setInputError,
  } = useAppContext();
  const [error, setError] = useState(null);
  const { setShowCheckboxes } = useLinkContext();
  let updatedFolders = [...folders];

  const handleClick = () => {
    if (folderInputs.folder_name && !error) {
      if (modalText.includes("Rename Folder")) {
        setFolders(updatedFolders);
        
        handleClose();
        setFolderInputs({
          folder_name: "",
          links: [],
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
    updatedFolders[editIndex].folder_name = newFolderInputs.folder_name;
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
      if (modalText.includes("Rename Folder")) {
        renameFolder(newFolderInputs);
      }
    }
  };

  return { handleClick, handleChange, error };
};

export default useNameFolder;
