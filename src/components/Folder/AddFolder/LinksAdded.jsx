import React from "react";
import { useAppContext } from "../../../Context/AppContext";
import { useLinkContext } from "../../../Context/LinkContext";
import { GoDotFill } from "react-icons/go";
import { styles } from "../../styles";
import { MdOutlineCancel } from "react-icons/md";
import toast from "react-hot-toast";
const LinksAdded = () => {
  const {
    handleClose,
    setMenu,
    folderInputs,
    setFolderInputs,
    setFolders,
    folders,
    setLinks,
    links,
    modalText,
    editIndex,
  } = useAppContext();
  const { setShowCheckboxes } = useLinkContext();

  const getFormattedName = (name) =>
    name.length > 38 ? `${name.substr(0, 38)} ...` : name;

  const getFormattedLink = (link) => {
    return link.length > 40 ? link.substr(0, 40) + " ..." : link;
  };

  const handleClick = () => {
    let updatedFolders = [...folders];
    if (modalText.includes("Edit Folder")) {
      updatedFolders[editIndex].folder_name = folderInputs.folder_name;
      updatedFolders[editIndex].links = [...folderInputs.links];
      console.log(updatedFolders)
      setFolders(updatedFolders);
      localStorage.setItem("Folders", JSON.stringify(updatedFolders));
      toast.success("Edited successfully!");
    } else {
      updatedFolders = [folderInputs, ...folders];
      const sortedUpdatedFolders = updatedFolders.sort(
        (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
      );
      setFolders(sortedUpdatedFolders);
      localStorage.setItem("Folders", JSON.stringify(sortedUpdatedFolders));
    }
    handleClose();
    setFolderInputs({
      folder_name: "",
      links: [],
    });
    setShowCheckboxes(false);
    setMenu("Unnamed");
  };

  const deleteLink = (index) => {
    const linkToRemove = folderInputs.links[index];
    const newFolderInputs = [...folderInputs.links];
    newFolderInputs.splice(index, 1);

    setFolderInputs((prevFolderInputs) => ({
      ...prevFolderInputs,
      links: newFolderInputs,
    }));

    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks.splice(linkToRemove.originalIndex, 0, {
        ...linkToRemove,
        selected: false,
      });
      return newLinks;
    });

    const updatedLinks = JSON.parse(localStorage.getItem("Links")) || [];
    updatedLinks.splice(linkToRemove.originalIndex, 0, {
      ...linkToRemove,
      selected: false,
    });
    localStorage.setItem("Links", JSON.stringify(updatedLinks));
  };

  return (
    <div>
      {folderInputs.links.length ? (
        <ul>
          {folderInputs.links.map((link, i) => (
            <li
              className="text-white w-full flex justify-between gap-4 mb-2 items-center text-sm"
              key={i}
            >
              <div className="flex items-center">
                <span>
                  <GoDotFill className="dark:text-white text-black text-[12px]" />
                </span>
                {link.url_name
                  ? getFormattedName(link.url_name)
                  : getFormattedLink(link.url)}
              </div>
              <MdOutlineCancel
                className="text-dimWhite hover:text-white cursor-pointer"
                onClick={() => deleteLink(i)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="text-dimWhite font-medium text-sm">
          Empty folder, proceed to{" "}
          <span
            className="underline text-primary cursor-pointer"
            onClick={() => setMenu("Add Links")}
          >
            add links
          </span>
        </h1>
      )}

      <div className="w-full flex justify-end mt-2">
        <button className={styles.button1} onClick={handleClick}>
          Done
        </button>
      </div>
    </div>
  );
};

export default LinksAdded;
