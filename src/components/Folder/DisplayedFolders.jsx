import { useAppContext } from "../../context";
import { useLinkContext } from "../../context";
import { useFolderContext } from "../../context";

import ContextMenu from "../Layout/ContextMenu";
import SelectOptions from "../SelectOptions";
import { FaBeerMugEmpty } from "react-icons/fa6";
import FolderList from "./FolderList";

const DisplayedFolders = () => {
  const { folders, contextMenu, contextMenuRef, modalText } = useAppContext();
  const { showFolderCheckboxes, index, setOpenFolder } = useFolderContext();
  const { isFolder, isFolderLinks } = useLinkContext();

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
          />
        </div>
      )}
      {folders.length ? (
        <FolderList />
      ) : (
        <div
          className={`bg-lightGray dark:bg-d-mediumGray flex flex-col items-center justify-center py-4 mt-4 shadow-xl`}
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
