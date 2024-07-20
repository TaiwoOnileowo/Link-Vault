import React from "react";
import { FaBeerMugEmpty } from "react-icons/fa6";
import ContextMenu from "../Layout/ContextMenu";
import { useAppContext } from "../../Context/AppContext";
import { useLinkContext } from "../../Context/LinkContext";
import { useFolderContext } from "../../Context/FolderContext";
import SelectOptions from "../Home/SelectOptions";

const Display = ({ children, display }) => {
  const { showCheckboxes } = useLinkContext();
  const { showFolderCheckboxes } = useFolderContext();
  const { contextMenu, contextMenuRef, links, modalText, folders, routes } =
    useAppContext();

  return (
    <>
      {contextMenu.visible && !showCheckboxes && !showFolderCheckboxes && (
        <div ref={contextMenuRef}>
          <ContextMenu items={links} />
        </div>
      )}
      {display.length > 0 ? (
        <>
          {(showCheckboxes || showFolderCheckboxes) &&
            !modalText.includes("Folder") && <SelectOptions display={links} />}
          {children}
        </>
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
    </>
  );
};

export default Display;
