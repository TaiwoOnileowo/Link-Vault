import { useAppContext, useLinkContext } from "../context";

const useModal = () => {
  const {
    handleClose,
    setFolderInputs,
    editIndex,
    modalText,
    folders,
    folderDetails,
    setInputError,
  } = useAppContext();
  const { setShowCheckboxes, handleSelectClick } = useLinkContext();
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
    handleSelectClick(true);
    setInputError(false);
    setShowCheckboxes(false);
    handleClose();
  };

  return { handleModalClose };
};

export default useModal;
