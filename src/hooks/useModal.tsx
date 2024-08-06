import { useAppContext, useLinkContext } from "../context";
import { AppContextType, LinkContextProps } from "../types";

const useModal = () => {
  const {
    handleClose,
    setFolderInputs,
    editIndex,
    modalText,
    folders,
    folderDetails,
    setInputError,
    setEditIndex,
  } = useAppContext() as AppContextType;
  const { setShowCheckboxes, handleSelectClick } = useLinkContext() as LinkContextProps;
  const handleModalClose = async () => {
    if (modalText.includes("Rename Folder")) {
      const updatedFolders = [...folders];
      updatedFolders[editIndex].folder_name = folderDetails.folder_name;
    }
    if (modalText.includes("Choose an Icon")) {
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
