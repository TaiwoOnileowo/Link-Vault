import { useState } from "react";
import { useAppContext, useModalContext } from "../context";
import { useLinkContext } from "../context";
import { useFolderContext } from "../context";
import toast from "react-hot-toast";
import { getCurrentTab } from "../utils/chromeUtilis";
import useSelectOptions from "./useSelectOptions";
import {} from "../utils/api";
import {
  AppContextType,
  FolderContextType,
  LinkContextProps,
  Links,
  ModalContextType,
} from "../types";

const useModalLink = () => {
  const {
    setLinks,
    links,
    setMenu,

    setFolders,
    route,
  } = useAppContext() as AppContextType;
  const {
    inputs,
    setInputs,
    modalText,
    editIndex,
    setFolderInputs,
    folderInputs,
    handleClose,
  } = useModalContext() as ModalContextType;
  const { isFolderLinks, setShowCheckboxes } =
    useLinkContext() as LinkContextProps;
  const { openFolderIndex } = useFolderContext() as FolderContextType;
  const [bounce, setBounce] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { handleShowAddFolder } = useSelectOptions();
  const folderRoute = route === "Folder";
  const handleSaveTab = () => {
    getCurrentTab().then((tab: Links) => {
      setInputs({ ...inputs, url: tab.url });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "url") {
      if (value === "") {
        setError("Url is required");
      } else {
        setError(null);
      }
    }

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));

    // Perform error check for URL existence as the user types
    if (name === "url" && !folderRoute) {
      const alreadyExists = links.some((link) => link.url === value);
      if (alreadyExists) {
        setError("Link already exists");
      } else {
        setError(null);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.url && !error) {
      let updatedLinks = [...links];
      if (modalText.includes("Edit Link")) {
        if (isFolderLinks) {
          setFolders((prevFolders) =>
            prevFolders.map((folder, i) => {
              if (i === openFolderIndex) {
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
          if (editIndex === null) return;
          updatedLinks[editIndex] = { ...inputs };
          setLinks(updatedLinks);

          toast.success("Edited successfully!");
        }
        setInputs({
          url: "",
          url_name: "",
        });
        handleClose();
      } else if (modalText.includes("Folder")) {
        setFolderInputs({
          ...folderInputs,
          links: [inputs, ...folderInputs.links],
          folder_icon: folderInputs.folder_icon,
        });
        toast.success("Added to folder");
      } else {
        updatedLinks = [inputs, ...updatedLinks];
        const sortedUpdatedLinks = updatedLinks.sort(
          (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
        );
        setLinks(sortedUpdatedLinks);

        toast.success("Saved successfully!");
        inputs.url_name ? setMenu("Named") : setMenu("Unnamed");
        handleClose();
      }
      setShowCheckboxes(false);
      setInputs({
        url: "",
        url_name: "",
      });
    } else if (!inputs.url) {
      setError("Url is required");
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
