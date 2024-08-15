import { folderIcons } from "../../public/foldericons";
import { useAppContext, useModalContext } from "../context";
import { useFolderContext } from "../context";
import { AppContextType, FolderContextType, ModalContextType } from "../types";
const useNewFolder = () => {
  const { setMenu, route } = useAppContext() as AppContextType;
  const { openModal, setFolderInputs } = useModalContext() as ModalContextType;
  const { setOpenFolderIndex } = useFolderContext() as FolderContextType;
  const isFolder = route === "Folder";
  const createFolder = () => {
    setMenu("Name");
    openModal("Create New Folder", null, null, null, isFolder);
    setFolderInputs({
      folder_name: "",
      links: [],
      folder_icon: folderIcons[8],
    });
    setOpenFolderIndex(null);
  };
  return { createFolder };
};

export default useNewFolder;
