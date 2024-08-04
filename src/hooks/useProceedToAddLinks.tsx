import useLinksAddedToFolder from "./useLinksAddedToFolder";
import { useAppContext } from "../context";
import { useFolderContext } from "../context";

const useProceedToAddLinks = () => {
  const { openModal, folders, setMenu } = useAppContext();
  const { AddLinks } = useLinksAddedToFolder();
  const { openFolderIndex, setOpenFolderIndex } = useFolderContext();
  const defaultDetails = {
    folder_name: openFolderIndex && folders[openFolderIndex]?.folder_name,
    links: [],
  };

  const handleClick = (
    showModal: boolean,
    details: {
      folder_name: string;
      links: Array<any>;
    },
    index: number
  ) => {
    if (showModal) {
      openModal(
        "Save Links To Folder",
        details ? details : defaultDetails,
        index,
        true
      );
      setOpenFolderIndex(null);
      setMenu("Add Links");
    } else {
      AddLinks();
    }
  };
  return { handleClick };
};

export default useProceedToAddLinks;
