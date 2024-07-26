import { useRef } from "react";
import { FaRegEdit, FaRegCopy } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCheckBox } from "react-icons/md";
import { GrPin } from "react-icons/gr";
import { RiUnpinLine } from "react-icons/ri";
import { MdAddLink } from "react-icons/md";
import { useLinkContext } from "../../../context";
import { useAppContext } from "../../../context";
import { useFolderContext } from "../../../context";
import { useProceedToAddLinks } from "../../../hooks";
import ContextMenuItem from "./ContextMenuItem.jsx";
import useContextMenuPosition from "../../../hooks/useContextMenuPosition.js";
import { copyToClipboard } from "../../../utils/clipboardUtils.js";
import propTypes from "prop-types";
const ContextMenu = ({ items }) => {
  ContextMenu.propTypes = {
    items: propTypes.array.isRequired,
  };
  const menuRef = useRef(null);
  const {
    setShowCheckboxes,
    handleDelete,
    handlePinClick,
    handleSelectClick,
    isFolder,
    isFolderLinks,
    handleCopyFolder,
  } = useLinkContext();
  const { handleClick } = useProceedToAddLinks();
  const {
    setShowFolderCheckboxes,
    setIndex: setFolderIndex,
    setOpenFolder,
  } = useFolderContext();
  const {
    openModal,
    searchInput,
    contextMenu,
    handleHideContextMenu,
    setMenu,
  } = useAppContext();
  const { x, y, visible, linkIndex } = contextMenu;

  useContextMenuPosition(x, y, visible, menuRef);

  if (
    !visible ||
    !items ||
    linkIndex === null ||
    linkIndex === undefined ||
    !items[linkIndex]
  ) {
    return null;
  }

  return (
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        zIndex: 1000,
      }}
      className="py-2 bg-[#333] animate-slide-down overflow-hidden text-white max-w-[170px] shadow-lg rounded-md"
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="flex flex-col w-full">
        <ContextMenuItem
          onClick={() => {
            const details = isFolder
              ? {
                  folder_name: items[linkIndex].folder_name,
                  links: items[linkIndex].links,
                }
              : {
                  url: items[linkIndex].url,
                  url_name: items[linkIndex].url_name,
                  pinned: items[linkIndex].pinned,
                };
            if (isFolder) {
              setOpenFolder(false);
              setMenu("Name");
              setFolderIndex(linkIndex);
            }
            openModal(
              isFolder ? "Rename Folder" : "Edit Link",
              details,
              linkIndex,
              isFolder
            );
            handleHideContextMenu();
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
              };
              handleClick(true, details);
              handleHideContextMenu();
            }}
            icon={<MdAddLink />}
            text="Add Links"
          />
        )}

        <ContextMenuItem
          onClick={() => {
            handleDelete(linkIndex);
            handleHideContextMenu();
          }}
          icon={<RiDeleteBin6Line />}
          text="Delete"
        />
        <ContextMenuItem
          onClick={() => {
            handlePinClick(linkIndex);
            handleHideContextMenu();
          }}
          icon={items[linkIndex].pinned ? <RiUnpinLine /> : <GrPin />}
          text={items[linkIndex].pinned ? "Unpin" : "Pin"}
          hidden={isFolderLinks && true}
        />
        <ContextMenuItem
          onClick={() => {
            isFolder
              ? handleCopyFolder(linkIndex)
              : copyToClipboard(items[linkIndex].url);
            handleHideContextMenu();
          }}
          icon={<FaRegCopy />}
          text={`Copy ${isFolder ? "Folder " : ""}`}
        />
        <hr className="w-full border-light border-opacity-10" />
        <ContextMenuItem
          onClick={() => {
            if (isFolder) {
              setOpenFolder(false);
              setShowFolderCheckboxes(true);
            } else {
              setShowCheckboxes(true);
            }

            handleHideContextMenu();

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
