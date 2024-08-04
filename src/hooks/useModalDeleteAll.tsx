import { useAppContext } from "../context";
import { useLinkContext } from "../context";

const useModalDeleteAll = () => {
  const { handleClose, setLinks, setFolders } = useAppContext();
  const { setShowCheckboxes, setIsFolderLinks } = useLinkContext();

  const handleCancel = () => {
    setLinks((prevLinks:Array<any>) =>
      prevLinks.map((link) => {
        const newLink = { ...link };
        delete newLink.selected;
        return newLink;
      })
    );
    setFolders((prevFolders:Array<any>) =>
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
