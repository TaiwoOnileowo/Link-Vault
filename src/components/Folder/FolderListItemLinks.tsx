import DisplayedLinks from "../Home/DisplayedLinks";
import { useLinkContext, useModalContext } from "../../context";
import { useAppContext } from "../../context";
import { useFolderContext } from "../../context";
import SelectOptions from "../SelectOptions";
import React from "react";
import ProceedToAddLinks from "./AddNewFolder/LinksAddedToFolder/ProceedToAddLinks";
import ContextMenu from "../Layout/ContextMenu";
import LinkPreview from "../LinkPreview";
import {
  AppContextType,
  FolderContextType,
  Folders,
  LinkContextProps,
  ModalContextType,
} from "../../types";
import usePreviewLink from "../../hooks/usePreviewLink";
import { useContextMenu } from "../../hooks";
const FolderListItemLinks = ({ folder }: { folder: Folders }) => {
  const { showCheckboxes } = useLinkContext() as LinkContextProps;
  const { openFolderIndex, showFolderCheckboxes } =
    useFolderContext() as FolderContextType;
  const { folders } = useAppContext() as AppContextType;
  const { modalText } = useModalContext() as ModalContextType;
  const { previewLink, previewLinkRef } = usePreviewLink();
  const linkIndex = previewLink?.linkIndex ?? 0;
  const { contextMenu, contextMenuRef } = useContextMenu();
  const display =
    openFolderIndex !== null ? folders[openFolderIndex].links : [];
  return (
    <>
      {folder.links?.length > 0 ? (
        <div
          className="text-sm -mt-2"
          onContextMenu={(e) => e.preventDefault()}
        >
          {showCheckboxes && !modalText.includes("Folder") && (
            <div className="mt-1">
              <SelectOptions display={display} />
            </div>
          )}{" "}
          {contextMenu.visible && !showFolderCheckboxes && (
            <div ref={contextMenuRef}>
              <ContextMenu items={display} />
            </div>
          )}
          <>
            {previewLink.visible && (
              <div ref={previewLinkRef}>
                <LinkPreview url={folder.links[linkIndex].url} />
              </div>
            )}
          </>
          <DisplayedLinks display={folder.links} isFolderLinks={true} />
        </div>
      ) : (
        <ProceedToAddLinks showModal={true} />
      )}
    </>
  );
};

export default FolderListItemLinks;
