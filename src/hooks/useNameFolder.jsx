import { useLinkContext } from "../context/LinkContext";
import { useAppContext } from "../context/AppContext";

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
  } = useAppContext();

  const { setShowCheckboxes } = useLinkContext();
  let updatedFolders = [...folders];
  const handleClick = () => {
    if (folderInputs.folder_name) {
      if (modalText.includes("Rename Folder")) {
        setFolders(updatedFolders);
        localStorage.setItem("Folders", JSON.stringify(updatedFolders));
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
  const handleChange = (e) => {
    const newFolderInputs = {
      ...folderInputs,
      [e.target.name]: e.target.value,
    };
    setFolderInputs(newFolderInputs);

    if (modalText.includes("Rename Folder")) {
      renameFolder(newFolderInputs);
    }
  };
  return { handleClick, handleChange };
};

export default useNameFolder;
