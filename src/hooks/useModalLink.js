import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useLinkContext } from "../context/LinkContext";
import { useFolderContext } from "../context/FolderContext";
import toast from "react-hot-toast";
import { getCurrentTab } from "../utils/chromeUtilis";

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
          localStorage.setItem("Links", JSON.stringify(updatedLinks));
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
        localStorage.setItem("Links", JSON.stringify(sortedUpdatedLinks));
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
  return {
    handleSubmit,
    handleSaveTab,
    handleChange,
    bounce,
    setBounce,
    handleCancel,
    error,
  };
};

export default useModalLink;