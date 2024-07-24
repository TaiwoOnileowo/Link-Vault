import { useAppContext } from "../context/AppContext";

const useModal = () => {
  const {
    handleClose,
    setLinks,
    folderInputs,
    setFolderInputs,
    links,
    modalText,
  } = useAppContext();

  const handleModalClose = () => {
    if (modalText.includes("Add New Folder")) {
      // Move links back to their original positions in the links array
      const movedBackLinks = folderInputs.links
        .filter((link) => link.selected)
        .map((link) => ({
          ...link,
          selected: false,
        }));

      const updatedLinks = JSON.parse(localStorage.getItem("Links")) || [];

      movedBackLinks.forEach((link) => {
        updatedLinks.splice(link.originalIndex, 0, link);
      });

      setLinks(updatedLinks);
      localStorage.setItem("Links", JSON.stringify(updatedLinks));
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
