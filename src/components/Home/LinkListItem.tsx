import { useLinkContext } from "../../context";
import { useAppContext } from "../../context";
import React from "react";
import { GoDotFill } from "react-icons/go";
import Checkbox from "../Checkbox";
import Link from "./Link";
import { AppContextType, LinkContextProps, Links } from "../../types";
import { useContextMenu } from "../../hooks";

const LinkListItem = ({
  link,
  index,
  isSearchResults,
  isExistingLinks,
  isFolderLinks,
}: {
  link: Links;
  index: number;
  isSearchResults?: boolean;
  isExistingLinks?: boolean;
  isFolderLinks?: boolean;
}) => {
  const { setIsFolder, isFolder, setIsFolderLinks, showCheckboxes } =
    useLinkContext() as LinkContextProps;

  const { route } = useAppContext() as AppContextType;
  const { handleContextMenu } = useContextMenu();
  console.log(isFolder);
  console.log(isFolderLinks, "dax");
  return (
    <div
      key={index}
      className={`${
        isSearchResults ? "fade-up" : null
      } flex items-center gap-[2px] `}
      onContextMenu={(e) => {
        if (route === "Folder") {
          setIsFolderLinks(true);
          setIsFolder(false);
        }
        handleContextMenu(e, index);
      }}
    >
      {showCheckboxes ? (
        <Checkbox link={link} originalIndex={index} />
      ) : (
        <GoDotFill className="dark:text-white text-black text-xs mt-2" />
      )}

      <Link isExistingLinks={isExistingLinks} link={link} index={index} />
    </div>
  );
};

export default LinkListItem;
