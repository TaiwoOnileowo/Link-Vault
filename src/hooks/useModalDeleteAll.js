import { useAppContext } from "../context/AppContext";
import { useLinkContext } from "../context/LinkContext";

const useModalDeleteAll = () => {
  const { handleClose, setLinks, setFolders } = useAppContext();
  const { setShowCheckboxes, setIsFolderLinks } = useLinkContext();

  const handleCancel = () => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => {
        const newLink = { ...link };
        delete newLink.selected;
        return newLink;
      })
    );
    setFolders((prevFolders) =>
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
