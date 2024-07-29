import { useState, useEffect } from "react";
import { useAppContext } from "../context";
import { useLinkContext } from "../context";

const useAddLinksToFolder = () => {
  const { existingLinks, setExistingLinks, setShowCheckboxes,  handleSelectClick  } =
    useLinkContext();
  const [showLinks, setShowLinks] = useState(false);
  const [updatedLinks, setUpdatedLinks] = useState([]);
  const { folderInputs, setFolderInputs } = useAppContext();

  const linksSelected = existingLinks.filter((link) => link.selected);
  useEffect(() => {
    const updatedLinks = existingLinks.filter((link) => !link.selected);
    setUpdatedLinks(updatedLinks);
  }, [existingLinks]);

  const handleClick = () => {
    setFolderInputs({
      ...folderInputs,
      links: [...linksSelected, ...folderInputs.links],
    });

    setExistingLinks(updatedLinks);
  };
  const handleChooseFromExistingLinks = () => {
    const deselectedLinks = existingLinks.map((link) => {
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
