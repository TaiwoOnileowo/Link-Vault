import { useAppContext, useModalContext } from "../context";
import { useFolderContext } from "../context";
import { AppContextType, FolderContextType, ModalContextType } from "../types";
const useNewFolder = () => {
  const { setMenu } = useAppContext() as AppContextType;
  const { openFolderModal } = useModalContext() as ModalContextType;
  const { setOpenFolderIndex } = useFolderContext() as FolderContextType;

  const createFolder = () => {
    setMenu("Name");
    openFolderModal("Create New Folder", null);
    setOpenFolderIndex(null);
  };
  return { createFolder };
};

export default useNewFolder;
