import React, { useState } from "react";
import ModalLink from "../../Layout/Modal/ModalLink";
import DisplayedLinks from "../../Home/DisplayedLinks";
import { useLinkContext } from "../../../Context/LinkContext";
import { useAppContext } from "../../../Context/AppContext";
import { IoCheckmark } from "react-icons/io5";

const AddLinks = () => {
  const [showLinks, setShowLinks] = useState(false);
  const { setShowCheckboxes, sortedNamedLinks, sortedUnnamedLinks } = useLinkContext();
  const { links, setLinks, folderInputs, setFolderInputs } = useAppContext();

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
      links: [...folderInputs.links, ...selectedWithIndex],
    });

    // Remove selected links from the links array and update the state
    const updatedLinks = links.filter((link) => !link.selected);

    // Deselect the remaining links and update the state
    const deselectedLinks = updatedLinks.map((link) => {
      const newLink = { ...link };
      delete newLink.selected;
      return newLink;
    });

    // Update the links state with the new links array
    setLinks(deselectedLinks);

    // Save the updated links array to localStorage
    localStorage.setItem("Links", JSON.stringify(deselectedLinks));
  };

  const existingLinks = [...sortedNamedLinks, ...sortedUnnamedLinks];

  return (
    <div>
      <ModalLink />
      <div className="flex flex-col items-center mt-2 text-white">
        <p className="text-sm text-slate-300">OR</p>
        <h2
          className="bg-primary/50 p-2 px-4 text-sm cursor-pointer hover:bg-primary rounded-md mt-2"
          onClick={() => {
            setShowCheckboxes(true);
            setShowLinks(true);
          }}
        >
          Choose from your existing links
        </h2>
      </div>
      {showLinks && (
        <div className="max-h-[300px] max-w-[300px] overflow-x-hidden text-xs mt-4 text-primary scrollbar">
          <div className="flex justify-between items-center px-4">
            <p className="text-dimWhite">Selected({linksSelected.length})</p>
            {linksSelected.length > 0 && (
              <span onClick={handleClick} className="cursor-pointer">
                <IoCheckmark size={18} />
              </span>
            )}
          </div>
          <DisplayedLinks display={existingLinks} isExistingLinks />
        </div>
      )}
    </div>
  );
};

export default AddLinks;
