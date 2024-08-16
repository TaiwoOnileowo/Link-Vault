import { useState, useEffect } from "react";
import { useModalContext } from "../context";
import { useLinkContext } from "../context";
import { LinkContextProps, Links, ModalContextType } from "../types";
import toast from "react-hot-toast";
import { initialInputs } from "../constants/initialStates";
import useModalLink from "./useModalLink";
const useAddLinksToFolder = () => {
  const { existingLinks, setExistingLinks, setShowCheckboxes } =
    useLinkContext() as LinkContextProps;
  const [showLinks, setShowLinks] = useState(false);
  const [updatedLinks, setUpdatedLinks] = useState<Links[] | []>([]);
  const { folderInputs, setFolderInputs, inputs, setInputs } =
    useModalContext() as ModalContextType;
  const [error, setError] = useState<string | null>(null);
  const linksSelected = existingLinks.filter((link) => link.selected);

  useEffect(() => {
    const updatedLinks = existingLinks.filter((link) => !link.selected);
    setUpdatedLinks(updatedLinks);
  }, [existingLinks]);
  console.log("Existing Links", existingLinks);
  console.log("Updated Links", updatedLinks);
  const handleClick = () => {
    setFolderInputs({
      ...folderInputs,
      links: [...linksSelected, ...folderInputs?.links].map((link) => ({
        ...link,
        selected: false,
      })),
    });

    setExistingLinks(updatedLinks);
  };
  const handleChooseFromExistingLinks = () => {
    const deselectedLinks = existingLinks.map((link: any) => {
      const newLink = { ...link };
      delete newLink.selected;
      return newLink;
    });
    setExistingLinks(deselectedLinks);
    setShowCheckboxes(true);
    setShowLinks(true);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputs.url === "") {
      setError("URL is required");
      return;
    } else {
      setError(null);
      setFolderInputs({
        ...folderInputs,
        links: [inputs, ...folderInputs.links],
        folder_icon: folderInputs.folder_icon,
      });
      toast.success("Added to folder");
      setInputs(initialInputs);
    }
  };
  return {
    handleClick,
    linksSelected,
    updatedLinks,
    handleChooseFromExistingLinks,
    showLinks,
    error,
    handleSubmit,
  };
};

export default useAddLinksToFolder;
