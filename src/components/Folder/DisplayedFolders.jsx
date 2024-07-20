import React, { useState } from "react";
import { FaCaretRight, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../../Context/AppContext";
import { useLinkContext } from "../../Context/LinkContext";
import { useFolderContext } from "../../Context/FolderContext";
import { TbPinFilled } from "react-icons/tb";
import Checkbox from "../Home/Checkbox";
import Display from "../Layout/Display";
import DisplayedLinks from "../Home/DisplayedLinks";
import ContextMenu from "../Layout/ContextMenu";
import SelectOptions from "../Home/SelectOptions";
import { FaBeerMugEmpty } from "react-icons/fa6";

const DisplayedFolders = ({ openFolder, setOpenFolder }) => {
  const { folders, handleContextMenu, contextMenu, contextMenuRef, modalText } =
    useAppContext();
  const { showFolderCheckboxes, index, setIndex } = useFolderContext();

  const {
    handleSelect,
    isFolder,
    isFolderLinks,
    setIsFolder,
    setIsFolderLinks,
    showCheckboxes,
  } = useLinkContext();
  console.log(index);
  return (
    <div className="mt-4 text-white">
      {contextMenu.visible && !showFolderCheckboxes && (
        <div ref={contextMenuRef}>
          <ContextMenu
            items={isFolderLinks ? folders[index].links : folders}
            isFolder={isFolder}
            isFolderLinks={isFolderLinks}
            setOpenFolder={setOpenFolder}
          />
        </div>
      )}
      {showFolderCheckboxes && !modalText.includes("Folder") && (
        <div className="mb-4">
          <SelectOptions
            display={isFolderLinks ? folders[index].links : folders}
            isFolder={isFolder}
          />
        </div>
      )}
      {folders.length ? (
        <ul className="flex flex-col gap-2">
          {folders.map((folder, i) => (
            <div key={i} className="select-none flex flex-col">
              <div
                className="flex gap-2 items-center w-fit h-fit"
                onContextMenu={(e) => {
                  setIsFolder(true);
                  setIsFolderLinks(false);
                  handleContextMenu(e, i);
                }}
              >
                {showFolderCheckboxes && (
                  <Checkbox link={folder} originalIndex={i} />
                )}
                <li
                  className="inline-flex items-center gap-2 font-bold text-base"
                  onClick={(e) => {
                    if (showFolderCheckboxes) {
                      handleSelect(i, true);
                    } else {
                      setIndex(i);
                      setOpenFolder((prev) => !prev);
                    }
                  }}
                >
                  <span className="flex items-center bg-black-gradient rounded-md cursor-pointer p-1 px-2">
                    <span className="text-xs">
                      {openFolder && index === i ? (
                        <FaCaretDown />
                      ) : (
                        <FaCaretRight />
                      )}
                    </span>
                    {folder.folder_name}
                  </span>
                  {folder.pinned && (
                    <TbPinFilled className="dark:text-[#4c4c74] text-[#2a4ff6]" />
                  )}
                </li>
              </div>
              {openFolder && folder.links?.length > 0 && index === i && (
                <div
                  className="text-sm -mt-2"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {showCheckboxes && !modalText.includes("Folder") && (
                    <div className="mt-1">
                      <SelectOptions
                        display={openFolder ? folders[index].links : folders}
                      />
                    </div>
                  )}
                  <DisplayedLinks display={folder.links} openFolder />
                </div>
              )}
            </div>
          ))}
        </ul>
      ) : (
        <div
          className={`bg-white dark:bg-dark h-[50%] bg-opacity-50 flex flex-col items-center justify-center py-4 mt-4 shadow-xl`}
        >
          <FaBeerMugEmpty className="w-24 h-24 dark:text-[#d5ebff] text-[#2a4ff6]" />
          <h2 className="dark:text-white text-black text-[28px] font-semibold pb-4">
            Nothing Here😐...
          </h2>
        </div>
      )}
    </div>
  );
};

export default DisplayedFolders;
