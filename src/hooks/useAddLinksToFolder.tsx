import { useState, useEffect } from "react";
import { useAppContext, useModalContext } from "../context";
import { useLinkContext } from "../context";
import {
  AppContextType,
  LinkContextProps,
  Links,
  ModalContextType,
} from "../types";

const useAddLinksToFolder = () => {
  const {
    existingLinks,
    setExistingLinks,
    setShowCheckboxes,
    handleSelectClick,
  } = useLinkContext() as LinkContextProps;
  const [showLinks, setShowLinks] = useState(false);
  const [updatedLinks, setUpdatedLinks] = useState<Links[] | []>([]);
  const { folderInputs, setFolderInputs } =
    useModalContext() as ModalContextType;

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

  return {
    handleClick,
    linksSelected,
    updatedLinks,
    handleChooseFromExistingLinks,
    showLinks,
  };
};

export default useAddLinksToFolder;
