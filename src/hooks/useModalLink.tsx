import { useState } from "react";
import { useAppContext, useModalContext } from "../context";
import { useLinkContext } from "../context";
import { useFolderContext } from "../context";
import toast from "react-hot-toast";
import { getCurrentTab } from "../utils/chromeUtilis";
import useSelectOptions from "./useSelectOptions";

import {
  AppContextType,
  FolderContextType,
  LinkContextProps,
  Links,
  ModalContextType,
} from "../types";

const useModalLink = () => {
  const { setLinks, links, setMenu, setFolders, route } =
    useAppContext() as AppContextType;

  const {
    inputs,
    setInputs,
    modalText,
    editIndex,
    setFolderInputs,
    folderInputs,
    handleClose,
    clickedIndex,
  } = useModalContext() as ModalContextType;

  const { isFolderLinks, setShowCheckboxes, handleSelectClick } =
    useLinkContext() as LinkContextProps;

  const { openFolderIndex } = useFolderContext() as FolderContextType;

  const [bounce, setBounce] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { handleShowAddFolder } = useSelectOptions();
  const folderRoute = route === "Folder";
  const mountedModal = clickedIndex > -1;

  const handleSaveTab = () => {
    getCurrentTab().then((tab: Links) => {
      setInputs({ ...inputs, url: tab.url });
    });
  };

  const validateUrl = (url: string) => {
    if (url === "") {
      return "URL is required";
    } else if (links.some((link) => link.url === url) && !mountedModal) {
      return "Link already exists";
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newError: string | null = null;

    if (name === "url") {
      newError = validateUrl(value);
      setError(newError);
    }

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newError = validateUrl(inputs.url);
    if (newError) {
      setError(newError);
      return;
    }

    let updatedLinks = [...links];

    if (mountedModal) {
      updatedLinks[clickedIndex] = { ...inputs };
      setLinks(updatedLinks);
      toast.success("Edited successfully!");
      handleClose();
    } else {
      updatedLinks = [inputs, ...updatedLinks];
      const sortedUpdatedLinks = updatedLinks
        .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
        .map((link) => ({ ...link, selected: false }));
      setLinks(sortedUpdatedLinks);
      toast.success("Saved successfully!");
      inputs.url_name ? setMenu("Named") : setMenu("Unnamed");
      handleClose();
    }

    setShowCheckboxes(false);
    setInputs({ url: "", url_name: "" });
  };

  const handleCancel = () => {
    handleClose();
    setShowCheckboxes(false);
    setError(null); // Clear the error when canceling
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
    mountedModal,
  };
};

export default useModalLink;
