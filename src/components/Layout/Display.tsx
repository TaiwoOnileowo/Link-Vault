import { FaBeerMugEmpty } from "react-icons/fa6";
import ContextMenu from "./ContextMenu";
import { useAppContext } from "../../context";
import { useLinkContext } from "../../context";
import { useFolderContext } from "../../context";
import SelectOptions from "../SelectOptions";
import LinkPreview from "../LinkPreview";
import React from "react";
import {
  AppContextType,
  FolderContextType,
  LinkContextProps,
} from "../../types";
import { useContextMenu } from "../../hooks";
import usePreviewLink from "../../hooks/usePreviewLink";
const Display = ({
  children,
  display,
  isSearchResults,
}: {
  children: React.ReactNode;
  display: Array<any>;
  isSearchResults?: boolean;
}) => {
  const { showCheckboxes } = useLinkContext() as LinkContextProps;
  const { showFolderCheckboxes } = useFolderContext() as FolderContextType;
  const { links } = useAppContext() as AppContextType;
  const { contextMenu, contextMenuRef } = useContextMenu();
  const { previewLink, previewLinkRef } = usePreviewLink();

console.log(contextMenu, "contextMenudd")
  const newLinkIndex = previewLink?.linkIndex ?? 0;

  return (
    <>
   
      {previewLink.visible && (
        <div ref={previewLinkRef}>
          <LinkPreview url={links[newLinkIndex].url} />
        </div>
      )}
      {display.length > 0 ? (
        <>
          {showCheckboxes && <SelectOptions display={links} />}
          {children}
        </>
      ) : (
        <div
          className={`bg-lightGray dark:bg-d-mediumGray flex flex-col items-center justify-center py-4 mt-4 shadow-xl`}
        >
          <FaBeerMugEmpty className="w-24 h-24 dark:text-[#d5ebff] text-[#2a4ff6]" />
          <h2 className="dark:text-white text-darkGray  text-[28px] font-semibold py-4">
            Nothing {isSearchResults ? "Found" : "Here"} 😐...
          </h2>
        </div>
      )}
    </>
  );
};

export default Display;
