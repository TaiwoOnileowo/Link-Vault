import useLinksAddedToFolder from "./useLinksAddedToFolder";
import { useAppContext } from "../context";
import { useFolderContext } from "../context";

const useProceedToAddLinks = () => {
  const { openModal, folders, setMenu } = useAppContext();
  const { AddLinks } = useLinksAddedToFolder();
  const { index: folderIndex, setOpenFolder } = useFolderContext();
  const defaultDetails = {
    folder_name:  folders[folderIndex]?.folder_name,
    links: [],
  };
  

  const handleClick = (showModal, details) => {
    console.log(details);
    console.log(defaultDetails)
    if (showModal) {
      openModal(
        "Save Links To Folder",
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
