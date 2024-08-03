import { useAppContext } from "../../context";
import { useLinkContext } from "../../context";
import Checkbox from "../Checkbox";
import FolderListItemLinks from "./FolderListItemLinks";
import { useFolderContext } from "../../context";
import { TbPinFilled } from "react-icons/tb";
import PropTypes from "prop-types";

const FolderListItem = ({ folder, index, isModal }:{
  folder: object,
  index: number,
  isModal?: boolean
}) => {


  const { handleContextMenu, darkMode } = useAppContext();
  const { handleSelect, setIsFolder, setIsFolderLinks, setShowCheckboxes } =
    useLinkContext();
  const { showFolderCheckboxes, toggleFolder, openFolderIndex } =
    useFolderContext();

  console.log(showFolderCheckboxes);
  return (
    <div key={index} className="select-none flex flex-col">
      <div
        className="flex gap-2 items-center w-fit h-fit"
        onContextMenu={(e) => {
          setIsFolder(true);
          setIsFolderLinks(false);
          handleContextMenu(e, index);
        }}
        onClick={() => !showFolderCheckboxes && toggleFolder(index)}
      >
        {(showFolderCheckboxes || isModal) && (
          <Checkbox link={folder} originalIndex={index} isModal={isModal} />
        )}
        <li
          className="inline-flex items-center gap-2 font-bold text-base"
          onClick={() => {
            if (showFolderCheckboxes) {
              handleSelect(index, true);
            } else {
              setShowCheckboxes(false);
            }
          }}
        >
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
