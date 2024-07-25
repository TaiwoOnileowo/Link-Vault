import React from "react";
import { useAppContext } from "../../context/AppContext";
import { useLinkContext } from "../../context/LinkContext";
import Checkbox from "../Checkbox";
import FolderListItemLinks from "./FolderListItemLinks";
import { useFolderContext } from "../../context/FolderContext";
import { TbPinFilled } from "react-icons/tb";

import adobe from "../../assets/Adobe.png";
const FolderListItem = ({ folder, index, isModal }) => {
  const { handleContextMenu, darkMode } = useAppContext();
  const { handleSelect, setIsFolder, setIsFolderLinks, setShowCheckboxes } =
    useLinkContext();
  const {
    showFolderCheckboxes,
    openFolder,
    setOpenFolder,
    index: folderIndex,
    setIndex,
  } = useFolderContext();
  return (
    <div key={index} className="select-none flex flex-col">
      <div
        className="flex gap-2 items-center  w-fit h-fit"
        onContextMenu={(e) => {
          setIsFolder(true);
          setIsFolderLinks(false);
          handleContextMenu(e, index);
        }}
      >
        {showFolderCheckboxes ||
          (isModal && <Checkbox link={folder} originalIndex={index} isModal={isModal}/>)}
        <li
          className="inline-flex items-center gap-2 font-bold text-base"
          onClick={(e) => {
            if (showFolderCheckboxes) {
              handleSelect(index, true);
            } else {
              setIndex(index);
              setOpenFolder((prev) => !prev);
              setShowCheckboxes(false);
            }
          }}
        >
          <span
            className={`flex items-center ${
              darkMode ? "dark" : null
            } folder-bg rounded-md cursor-pointer p-1 px-2 gap-2 min-w-[120px]`}
          >
            <span className="">
              <img
                src={adobe}
                alt="Folder Icon"
                className={`${isModal ? "w-3 h-3" : "w-4 h-4"} object-contain`}
              />
            </span>
            <span
              className={`${
                openFolder && index === folderIndex
                  ? "text-hoverPrimary"
                  : "text-white"
              } ${isModal ? "text-xs" : "text-base"}`}
            >
              {folder.folder_name}
            </span>
          </span>
          {folder.pinned && (
            <TbPinFilled className="dark:text-[#4c4c74] text-[#122ca3]" />
          )}
        </li>
      </div>
      {openFolder && folderIndex === index && (
        <FolderListItemLinks folder={folder} />
      )}
    </div>
  );
};

export default FolderListItem;
