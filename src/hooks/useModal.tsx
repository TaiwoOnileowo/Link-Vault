import { useAppContext, useLinkContext, useModalContext } from "../context";
import { AppContextType, LinkContextProps, ModalContextType } from "../types";

const useModal = () => {
  const { folders, setInputError } = useAppContext() as AppContextType;
  const {
    handleClose,
    setFolderInputs,
    editIndex,
    modalText,
    folderDetails,
    setEditIndex,
  } = useModalContext() as ModalContextType;
  const { setShowCheckboxes, handleSelectClick } =
    useLinkContext() as LinkContextProps;
  const handleModalClose = async () => {
    if (
      modalText.includes("Rename Folder") &&
      editIndex !== null &&
      folderDetails !== null
    ) {
      const updatedFolders = [...folders];
      updatedFolders[editIndex].folder_name = folderDetails.folder_name;
    }
    if (
      modalText.includes("Choose an Icon") &&
      editIndex !== null &&
      folderDetails !== null
    ) {
      const updatedFolders = [...folders];
      updatedFolders[editIndex].folder_icon = folderDetails.folder_icon;
    }
    setFolderInputs((prevFolderInputs) => ({
      ...prevFolderInputs,
      links: [],
    }));
    setEditIndex(null);
    handleSelectClick(true);
    setInputError(false);
    setShowCheckboxes(false);
    handleClose();
  };

  return { handleModalClose };
};

export default useModal;
