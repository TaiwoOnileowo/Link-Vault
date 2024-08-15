import { useAppContext, useModalContext } from "../context";
import { useLinkContext } from "../context";
import {
  AppContextType,
  FolderContextType,
  LinkContextProps,
  ModalContextType,
} from "../types";

const useModalDeleteAll = () => {
  const { setLinks, setFolders } = useAppContext() as AppContextType;
  const { setShowCheckboxes, setIsFolderLinks } =
    useLinkContext() as LinkContextProps;
  const { handleClose } = useModalContext() as ModalContextType;
  const handleCancel = () => {
    setLinks((prevLinks: Array<any>) =>
      prevLinks.map((link) => {
        const newLink = { ...link };
        delete newLink.selected;
        return newLink;
      })
    );
    setFolders((prevFolders: Array<any>) =>
      prevFolders.map((folder) => {
        const newFolder = { ...folder };
        delete newFolder.selected;
        return newFolder;
      })
    );
    setIsFolderLinks(false);
    setShowCheckboxes(false);
    handleClose();
  };
  return {
    handleCancel,
  };
};

export default useModalDeleteAll;
