import useLinksAddedToFolder from "./useLinksAddedToFolder";
import { useAppContext } from "../context/AppContext";
import { useFolderContext } from "../context/FolderContext";

const useProceedToAddLinks = () => {
  const { openModal, folders, setMenu } = useAppContext();
  const { AddLinks } = useLinksAddedToFolder();
  const { index: folderIndex, setOpenFolder } = useFolderContext();
  const defaultDetails = {
    folder_name: folderIndex && folders[folderIndex].folder_name,
    links: [],
  };
  const handleClick = (showModal, details) => {
    if (showModal) {
      openModal(
        "Add Links To Folder",
        details ? details : defaultDetails,
        folderIndex,
        true
      );
      setOpenFolder(false);
      setMenu("Add Links");
    } else {
      AddLinks();
    }
  };
  return { handleClick };
};

export default useProceedToAddLinks;