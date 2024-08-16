import { useLinkContext } from "../../context";
import { useAppContext , useModalContext} from "../../context";
import React from "react";
import { GoDotFill } from "react-icons/go";
import Checkbox from "../Checkbox";
import Link from "./Link";
import { AppContextType, LinkContextProps, Links, ModalContextType } from "../../types";
import { useContextMenu } from "../../hooks";
import ContextMenu from "../Layout/ContextMenu";
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
const { contextMenu } = useModalContext() as ModalContextType;
  const { route, links } = useAppContext() as AppContextType;
  const { handleContextMenu, contextMenuRef,  } = useContextMenu();
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
      {contextMenu.visible && !showCheckboxes && (
        <div ref={contextMenuRef}>
          <ContextMenu items={links} contextMenu={contextMenu} />
        </div>
      )}
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
