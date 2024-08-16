import React from "react";
import { useThemeContext } from "../../context";
import { useLinkContext, useModalContext, useAppContext } from "../../context";
import Checkbox from "../Checkbox";
import FolderListItemLinks from "./FolderListItemLinks";
import { useFolderContext } from "../../context";
import { TbPinFilled } from "react-icons/tb";
import {
  AppContextType,
  FolderContextType,
  Folders,
  LinkContextProps,
  ModalContextType,
  ThemeContextType,
} from "../../types";
import { useContextMenu } from "../../hooks";
import ContextMenu from "../Layout/ContextMenu";
const FolderListItem = ({
  folder,
  index,
  isModal,
}: {
  folder: Folders;
  index: number;
  isModal?: boolean;
}) => {
  const { folders } = useAppContext() as AppContextType
  const { darkMode } = useThemeContext() as ThemeContextType;
  const { handleSelect, setIsFolder, setIsFolderLinks } =
    useLinkContext() as LinkContextProps;
  const { showFolderCheckboxes, toggleFolder, openFolderIndex } =
    useFolderContext() as FolderContextType;
  const { handleContextMenu, contextMenuRef } = useContextMenu();
  const { contextMenu } = useModalContext() as ModalContextType;
  console.log(showFolderCheckboxes, isModal, "dax");
  return (
    <div key={index} className="select-none flex flex-col">
      <div
        className="flex gap-2 items-center w-fit h-fit"
        onContextMenu={(e) => {
          setIsFolder(true);
          setIsFolderLinks(false);
          handleContextMenu(e, index);
        }}
        onClick={() => {
          if (showFolderCheckboxes || isModal) {
            handleSelect(index, true);
          } else {
            console.log("togleddddddddddddddddd");
            toggleFolder(index);
          }
        }}
      >
        {contextMenu.visible && !showFolderCheckboxes && (
          <div ref={contextMenuRef}>
            <ContextMenu items={folders} contextMenu={contextMenu} />
          </div>
        )}
        {(showFolderCheckboxes || isModal) && (
          <Checkbox link={folder} originalIndex={index} isModal={isModal} />
        )}
        <li className="inline-flex items-center gap-2 font-bold text-base">
          <span
            className={`flex items-center ${
              darkMode ? "dark" : null
            } folder-bg rounded-md cursor-pointer p-1 px-2 gap-2 min-w-[120px]`}
          >
            <span>
              <img
                src={folder.folder_icon}
                alt="Folder Icon"
                className={`${isModal ? "w-4 h-4" : "w-6 h-6"} object-contain`}
              />
            </span>
            <span
              className={`${
                openFolderIndex === index ? "text-lightGray" : "text-white"
              } ${isModal ? "text-sm" : "text-base"}`}
            >
              {folder.folder_name}
            </span>
          </span>
          {folder.pinned && !isModal && (
            <TbPinFilled className="dark:text-[#4c4c74] text-[#122ca3]" />
          )}
        </li>
      </div>
      {openFolderIndex === index && <FolderListItemLinks folder={folder} />}
    </div>
  );
};

export default FolderListItem;
