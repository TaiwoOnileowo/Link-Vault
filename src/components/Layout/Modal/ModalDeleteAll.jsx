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
    e.preventDefault()
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
  return (
    <form className="flex gap-4 justify-center" onSubmit={handleSubmit}>
      <button type="submit" className={styles.button1}>
        Yes
      </button>
      <button
        className={styles.button2}
        onClick={() => {
          setLinks((prevLinks) =>
            prevLinks.map((link) => {
              const newLink = { ...link };
              delete newLink.selected;
              return newLink;
            })
          );
          handleClose();
        }}
      >
        Cancel
      </button>
    </form>
  );
};

export default ModalDeleteAll;
