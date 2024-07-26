import { useState } from "react";
import { useAppContext } from "../context";
import { useLinkContext } from "../context";
import { useFolderContext } from "../context";
import toast from "react-hot-toast";
import { getCurrentTab } from "../utils/chromeUtilis";
import useSelectOptions from "./useSelectOptions";
import { updateStorage } from "../utils/api";
const useModalLink = () => {
  const {
    handleClose,
    setLinks,
    links,
    setMenu,
    inputs,
    setInputs,
    modalText,
    editIndex,
    setFolderInputs,
    folderInputs,
    setFolders,
  } = useAppContext();
  const { isFolderLinks, setShowCheckboxes } = useLinkContext();
  const { index: folderIndex } = useFolderContext();
  const [bounce, setBounce] = useState(false);
  const [error, setError] = useState(false);
  const { handleShowAddFolder } = useSelectOptions();
  const handleSaveTab = () => {
    getCurrentTab().then((tab) => {
      setInputs({ ...inputs, url: tab.url });
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "url" && e.target.value === "") {
      setError(true);
    } else if (e.target.name === "url") {
      setError(false);
    }
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.url) {
      let updatedLinks = [...links];
      if (modalText.includes("Edit Link")) {
        if (isFolderLinks) {
          setFolders((prevFolders) =>
            prevFolders.map((folder, i) => {
              if (i === folderIndex) {
                return {
                  ...folder,
                  links: folder.links.map((link, j) => {
                    if (j === editIndex) {
                      return { ...inputs };
                    }
                    return link;
                  }),
                };
              }
              return folder;
            })
          );
          toast.success("Edited successfully!");
        } else {
          updatedLinks[editIndex] = { ...inputs };
          setLinks(updatedLinks);
          updateStorage("Links", updatedLinks);
          toast.success("Edited successfully!");
        }
        setInputs({
          url: "",
          url_name: "",
          tags: "",
        });
        handleClose();
      } else if (modalText.includes("Folder")) {
        setFolderInputs({
          ...folderInputs,
          links: [inputs, ...folderInputs.links],
        });
        toast.success("Added to folder");
      } else {
        updatedLinks = [inputs, ...updatedLinks];
        const sortedUpdatedLinks = updatedLinks.sort(
          (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
        );
        setLinks(sortedUpdatedLinks);
        updateStorage("Links", sortedUpdatedLinks);
        toast.success("Saved successfully!");
        inputs.url_name ? setMenu("Named") : setMenu("Unnamed");
        handleClose();
      }
      setShowCheckboxes(false);
      setInputs({
        url: "",
        url_name: "",
        tags: "",
      });
    } else {
      setError(true);
    }
  };
  const handleCancel = () => {
    handleClose();
    setShowCheckboxes(false);
  };
  const handleSaveToFolder = () => {
    const updatedInputs = { ...inputs, selected: true };

    handleShowAddFolder(updatedInputs);
  };

  return {
    handleSubmit,
    handleSaveTab,
    handleChange,
    bounce,
    setBounce,
    handleCancel,
    handleSaveToFolder,
    error,
  };
};

export default useModalLink;
