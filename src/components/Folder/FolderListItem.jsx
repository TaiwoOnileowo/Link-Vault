import React from "react";
import { useAppContext } from "../../context/AppContext";
import { useLinkContext } from "../../context/LinkContext";
import Checkbox from "../Checkbox";
import FolderListItemLinks from "./FolderListItemLinks";
import { useFolderContext } from "../../context/FolderContext";
import { TbPinFilled } from "react-icons/tb";
import { FaCaretRight, FaCaretDown } from "react-icons/fa";
import adobe from "../../assets/Adobe.png";
const FolderListItem = ({ folder, index }) => {
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
        className="flex gap-2  w-fit h-fit"
        onContextMenu={(e) => {
          setIsFolder(true);
          setIsFolderLinks(false);
          handleContextMenu(e, index);
        }}
      >
        {showFolderCheckboxes && (
          <Checkbox link={folder} originalIndex={index} />
        )}
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
            } folder-bg rounded-md cursor-pointer p-1 px-2 gap-1 min-w-[120px]`}
          >
            <span className="">
              <img src={adobe} alt="" className="w-4 h-4 object-contain" />
            </span>
            <span
              className={`${
                openFolder && index === folderIndex
                  ? "opacity-80"
                  : "text-white"
              }`}
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
