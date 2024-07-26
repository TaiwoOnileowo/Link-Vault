import { useAppContext } from "../context";
import { getInitialLinks } from "../utils/api";
const useModal = () => {
  const {
    handleClose,
    setLinks,
    folderInputs,
    setFolderInputs,
    editIndex,
    modalText,
    folders,
    folderDetails,
  } = useAppContext();

  const handleModalClose = async () => {
    if (modalText.includes("Add New Folder")) {
      // Move links back to their original positions in the links array
      const movedBackLinks = folderInputs.links
        .filter((link) => link.selected)
        .map((link) => ({
          ...link,
          selected: false,
        }));

      const updatedLinks = (await getInitialLinks()) || [];

      movedBackLinks.forEach((link) => {
        updatedLinks.splice(link.originalIndex, 0, link);
      });

      setLinks(updatedLinks);
      localStorage.setItem("Links", JSON.stringify(updatedLinks));
    }
    if (modalText.includes("Rename Folder")) {
      const updatedFolders = [...folders];
      updatedFolders[editIndex].folder_name = folderDetails.folder_name;
    }
    setFolderInputs((prevFolderInputs) => ({
      ...prevFolderInputs,
      links: [],
    }));
    handleClose();
    // setLinks(links.map((link) => ({ ...link, selected: false })));
  };

  return { handleModalClose };
};

export default useModal;
