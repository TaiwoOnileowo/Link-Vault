import React from "react";
import { useLinkContext } from "../../context/LinkContext";
import { useAppContext } from "../../context/AppContext";
import { useFolderContext } from "../../context/FolderContext";
import { GoDotFill } from "react-icons/go";
import Checkbox from "../Checkbox";
import Link from "./Link";
const LinkListItem = ({ link, index, isSearchResults, isExistingLinks }) => {
  const { setIsFolder, setIsFolderLinks, showCheckboxes, isFolder } =
    useLinkContext();
  const { openFolder } = useFolderContext();
  const { handleContextMenu } = useAppContext();
 
  return (
    <li
      key={index}
      className={`${
        isSearchResults ? "fade-up" : null
      } flex items-center gap-[2px] `}
      onContextMenu={(e) => {
        if (openFolder) {
          setIsFolderLinks(true);
          setIsFolder(false);
        }
        handleContextMenu(e, index);
      }}
    >
      {showCheckboxes ? (
        <Checkbox link={link} originalIndex={index} isFolder={isFolder} />
      ) : (
        <GoDotFill className="dark:text-white text-black text-xs mt-2" />
      )}
      <Link isExistingLinks={isExistingLinks} link={link} index={index} />
    </li>
  );
};

export default LinkListItem;
