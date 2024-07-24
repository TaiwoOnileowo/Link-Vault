import { useAppContext } from "../context/AppContext";
import { useFolderContext } from "../context/FolderContext";
const useNewFolder = () => {
  const { setMenu, openModal, setFolderInputs } = useAppContext();
  const { setOpenFolder } = useFolderContext();
  const createFolder = () => {
    setMenu("Name");
    openModal("Add New Folder", null);
    setFolderInputs({
      folder_name: "",
      links: [],
    });
    setOpenFolder(false);
  };
  return { createFolder };
};

export default useNewFolder;
