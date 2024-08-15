import useLinksAddedToFolder from "./useLinksAddedToFolder";
import { useAppContext, useModalContext } from "../context";
import { useFolderContext } from "../context";
import {
  AppContextType,
  FolderContextType,
  Folders,
  ModalContextType,
} from "../types";
import { folderIcons } from "../../public/foldericons";

const useProceedToAddLinks = () => {
  const { folders, setMenu } = useAppContext() as AppContextType;
  const { openModal } = useModalContext() as ModalContextType;
  const { AddLinks } = useLinksAddedToFolder();
  const { openFolderIndex, setOpenFolderIndex } =
    useFolderContext() as FolderContextType;
  const defaultDetails = {
    folder_name: openFolderIndex ? folders[openFolderIndex]?.folder_name : "",
    links: [],
    folder_icon: folderIcons[8],
  };

  const handleClick = (
    showModal: boolean,
    details: Folders | null,
    index: number
  ) => {
    if (showModal) {
      if (showModal) {
        const folderDetails = details ? details : defaultDetails;
        if (details === null) {
          folderDetails.folder_name = ""; 
        }
        openModal("Save Links To Folder", null, folderDetails, index, true);
        setOpenFolderIndex(null);
        setMenu("Add Links");
      } else {
        AddLinks();
      }
      setOpenFolderIndex(null);
      setMenu("Add Links");
    } else {
      AddLinks();
    }
  };
  return { handleClick };
};

export default useProceedToAddLinks;
