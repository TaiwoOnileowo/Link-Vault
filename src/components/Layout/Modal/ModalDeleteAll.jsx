import React from "react";
import { useAppContext } from "../../../Context/AppContext";
import toast from "react-hot-toast";
import { useLinkContext } from "../../../Context/LinkContext";
import { styles } from "../../styles";
import { useFolderContext } from "../../../Context/FolderContext";

const ModalDeleteAll = () => {
  const { handleClose, setLinks, links, routes, folders, setFolders } =
    useAppContext();
  const { setShowCheckboxes } = useLinkContext();
  const { setShowFolderCheckboxes } = useFolderContext();
  const isFolder = routes.folders;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFolder) {
      const updatedFolders = folders.filter((folder) => !folder.selected);
      setFolders(updatedFolders);
      localStorage.setItem("Folders", JSON.stringify(updatedFolders));
      setShowFolderCheckboxes(false);
    } else {
      const updatedLinks = links.filter((link) => !link.selected);
      setLinks(updatedLinks);
      localStorage.setItem("Links", JSON.stringify(updatedLinks));
      setShowCheckboxes(false);
    }
    handleClose();
    toast.success("Deleted successfully!");
  };

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
    handleClose();
  };

  return (
    <div>
      <form
        className="flex gap-4 justify-center"
        onSubmit={handleSubmit}
        id="modal-delete-form"
      >
        <button type="submit" className={styles.button1}>
          Yes
        </button>
        <button type="button" className={styles.button2} onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ModalDeleteAll;
