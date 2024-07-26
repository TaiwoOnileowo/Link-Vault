import { useAppContext } from "../context";
import { useFolderContext } from "../context";
const useNewFolder = () => {
  const { setMenu, openModal, setFolderInputs } = useAppContext();
  const { setOpenFolder } = useFolderContext();
  const createFolder = () => {
    setMenu("Name");
    openModal("Create New Folder", null);
    setFolderInputs({
      folder_name: "",
      links: [],
    });
    setOpenFolder(false);
  };
  return { createFolder };
};

export default useNewFolder;
