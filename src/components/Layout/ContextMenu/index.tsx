import React, { useRef } from "react";
import { FaRegEdit, FaRegCopy } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCheckBox } from "react-icons/md";
import { GrPin } from "react-icons/gr";
import { RiUnpinLine } from "react-icons/ri";
import { MdAddLink } from "react-icons/md";
import { TfiThemifyFavicon } from "react-icons/tfi";
import { useLinkContext, useModalContext } from "../../../context";
import { useAppContext } from "../../../context";
import { useFolderContext } from "../../../context";
import { useContextMenu, useProceedToAddLinks } from "../../../hooks";
import ContextMenuItem from "./ContextMenuItem.tsx";
import useContextMenuPosition from "../../../hooks/useContextMenuPosition.js";
import { copyToClipboard } from "../../../utils/clipboardUtils.js";

import {
  AppContextType,
  ContextMenuType,
  FolderContextType,
  LinkContextProps,
  ModalContextType,
} from "../../../types.ts";
const ContextMenu = ({
  items,
  contextMenu,
}: {
  items: Array<any>;
  contextMenu: ContextMenuType;
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const {
    setShowCheckboxes,
    handleDelete,
    handlePinClick,
    handleSelectClick,
    isFolderLinks,
    handleCopyFolder,
  } = useLinkContext() as LinkContextProps;
  const { handleClick } = useProceedToAddLinks();
  const { setShowFolderCheckboxes, setOpenFolderIndex } =
    useFolderContext() as FolderContextType;
  const { searchInput, setMenu, route } = useAppContext() as AppContextType;
  const { openLinkModal, openModal } = useModalContext() as ModalContextType;
  const { handleHideContextMenu } = useContextMenu();
  console.log(contextMenu, "contextMenu");
  if (!contextMenu) return null;
  const { x, y, visible, linkIndex } = contextMenu;
  const isFolder = route === "Folder" && !isFolderLinks;
  useContextMenuPosition(x, y, visible, menuRef);
  console.log(contextMenu, "daxfredeeeeeeeeeeeeeeeeeeee");
  // if (
  //   !visible ||
  //   !items ||
  //   linkIndex === null ||
  //   linkIndex === undefined ||
  //   !items[linkIndex]
  // ) {
  //   return null;
  // }

  return (
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        zIndex: 1000,
      }}
      className="py-2 bg-lightGray dark:bg-[#333] animate-slide-down overflow-hidden text-darkGray dark:text-white min-w-[180px] shadow-lg rounded-md"
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="flex flex-col items-center w-full">
        <ContextMenuItem
          onClick={() => {
            // const folderDetails = isFolder
            //   ? {
            //       folder_name: items[linkIndex].folder_name,
            //       links: items[linkIndex].links,
            //       folder_icon: items[linkIndex].folder_icon,
            //     }
            //   : null;
            // const linkDetails = isFolder
            //   ? null
            //   : {
            //       url: items[linkIndex].url,
            //       url_name: items[linkIndex].url_name,
            //       pinned: items[linkIndex].pinned,
            //     };

            // if (isFolder) {
            //   setOpenFolderIndex(null);
            //   setMenu("Name");
            // }

            openLinkModal(isFolder ? "Rename Folder" : "Edit Link", linkIndex);
          }}
          icon={<FaRegEdit />}
          text={isFolder ? "Rename" : " Edit"}
        />
        {isFolder && (
          <ContextMenuItem
            onClick={() => {
              const details = {
                folder_name: items[linkIndex].folder_name,
                links: items[linkIndex].links,
                folder_icon: items[linkIndex].folder_icon,
              };
              console.log("linkIndex", linkIndex);
              handleClick(true, details, linkIndex);
              handleHideContextMenu();
            }}
            icon={<MdAddLink />}
            text="Add Links"
          />
        )}
        <ContextMenuItem
          onClick={() => {
            handlePinClick(linkIndex);
            handleHideContextMenu();
          }}
          icon={items[linkIndex].pinned ? <RiUnpinLine /> : <GrPin />}
          text={items[linkIndex].pinned ? "Unpin" : "Pin"}
        />
        <ContextMenuItem
          onClick={() => {
            isFolder
              ? handleCopyFolder(linkIndex)
              : copyToClipboard(items[linkIndex].url);
          }}
          icon={<FaRegCopy />}
          text={`Copy ${isFolder ? "Folder " : ""}`}
        />
        <ContextMenuItem
          onClick={() => {
            handleDelete(linkIndex);
          }}
          icon={<RiDeleteBin6Line />}
          text="Delete"
        />

        {isFolder && (
          <>
            <hr className="w-full border-gray-100 my-1 opacity-10" />
            <ContextMenuItem
              onClick={() => {
                const folderDetails = {
                  folder_name: items[linkIndex].folder_name,
                  links: items[linkIndex].links,
                  folder_icon: items[linkIndex].folder_icon,
                };
                openModal(
                  "Choose an Icon",
                  null,
                  folderDetails,
                  linkIndex,
                  true
                );
                handleHideContextMenu();
              }}
              icon={<TfiThemifyFavicon />}
              text="Change Icon"
            />
          </>
        )}

        <hr className="w-full border-gray-800 my-1 opacity-20" />
        <ContextMenuItem
          onClick={() => {
            if (isFolder) {
              setOpenFolderIndex(null);
              setShowFolderCheckboxes(true);
            } else {
              setShowCheckboxes(true);
            }

            handleSelectClick(true);
          }}
          icon={<MdOutlineCheckBox />}
          disabled={searchInput ? true : false}
          text="Select"
        />
      </ul>
    </div>
  );
};

export default ContextMenu;
