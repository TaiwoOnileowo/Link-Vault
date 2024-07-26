import { useState } from "react";
import { useAppContext } from "../context";
import { useLinkContext } from "../context";
import { updateStorage } from "../utils/api";
const useAddLinksToFolder = () => {
  const [showLinks, setShowLinks] = useState(false);
  const { links, setLinks, folderInputs, setFolderInputs } = useAppContext();
  const { sortedNamedLinks, sortedUnnamedLinks, setShowCheckboxes } =
    useLinkContext();
  const existingLinks = [...sortedNamedLinks, ...sortedUnnamedLinks];
  const linksSelected = links.filter((link) => link.selected);
  const handleClick = () => {
    // Filter selected links and add the original index to each link
    const selectedWithIndex = linksSelected.map((link) => ({
      ...link,
      originalIndex: links.indexOf(link),
    }));

    // Add the selected links to the folderInputs.links array
    setFolderInputs({
      ...folderInputs,
      links: [...selectedWithIndex, ...folderInputs.links],
    });

    // Remove selected links from the links array and update the state
    const updatedLinks = links.filter((link) => !link.selected);

    // Deselect the remaining links and update the state
    const deselectedLinks = updatedLinks.map((link) => {
      const newLink = { ...link };
      delete newLink.selected;
      return newLink;
    });

    // setOpenFolder(true);
    // Update the links state with the new links array
    setLinks(deselectedLinks);

    updateStorage("Links", deselectedLinks);
  };

  const handleChooseFromExistingLinks = () => {
    setShowCheckboxes(true);
    setShowLinks(true);
  };
  return {
    handleClick,
    existingLinks,
    linksSelected,
    handleChooseFromExistingLinks,
    showLinks,
  };
};

export default useAddLinksToFolder;
