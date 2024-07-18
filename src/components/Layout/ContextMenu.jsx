import React, { useEffect, useRef } from "react";
import { FaRegEdit, FaRegCopy } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCheckBox } from "react-icons/md";
import { GrPin } from "react-icons/gr";
import { RiUnpinLine } from "react-icons/ri";
import { useLinkContext } from "../../Context/LinkContext";
import { useAppContext } from "../../Context/AppContext";
import { useFolderContext } from "../../Context/FolderContext";
const ContextMenu = ({ links, isFolder }) => {
  const menuRef = useRef(null);
  const {
    setShowCheckboxes,
    handleDelete,
    handleCopyToClipboard,
    handlePinClick,
    handleCopyFolder,
  } = useLinkContext();
  const { setShowFolderCheckboxes } = useFolderContext();
  const { openModal, searchInput, contextMenu, handleHideContextMenu } =
    useAppContext();
  const { x, y, visible, linkIndex } = contextMenu;

  useEffect(() => {
    const menuRefCurrent = menuRef.current;
    if (menuRefCurrent) {
      const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
      const { offsetWidth: menuWidth, offsetHeight: menuHeight } =
        menuRefCurrent;

      let adjustedX = x;
      let adjustedY = y;

      if (x + menuWidth > windowWidth) {
        adjustedX = windowWidth - menuWidth - 10;
      }

      if (y + menuHeight > windowHeight) {
        adjustedY = windowHeight - menuHeight - 10;
      }

      menuRefCurrent.style.left = `${adjustedX}px`;
      menuRefCurrent.style.top = `${adjustedY}px`;
    }
  }, [x, y, visible]);

  if (!visible) return null;

  if (
    !links ||
    linkIndex === null ||
    linkIndex === undefined ||
    !links[linkIndex]
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
            const folderDetails = {
              folder_name: links[linkIndex].folder_name,
              links: links[linkIndex].links,
            };

            const linkDetails = {
              url: links[linkIndex].url,
              url_name: links[linkIndex].url_name,
            };

            openModal(
              isFolder ? "Edit Folder" : "Edit Link",
              isFolder ? folderDetails : linkDetails,
              isFolder
            );
            handleHideContextMenu();
          }}
          icon={<FaRegEdit />}
          text="Edit"
        />
        <ContextMenuItem
          onClick={() => {
            handleDelete(linkIndex, isFolder);
            handleHideContextMenu();
          }}
          icon={<RiDeleteBin6Line />}
          text="Delete"
        />
        <ContextMenuItem
          onClick={() => {
            handlePinClick(linkIndex, isFolder);
            handleHideContextMenu();
          }}
          icon={links[linkIndex].pinned ? <RiUnpinLine /> : <GrPin />}
          text={links[linkIndex].pinned ? "Unpin" : "Pin"}
        />
        <ContextMenuItem
          onClick={() => {
            isFolder
              ? handleCopyFolder(linkIndex)
              : handleCopyToClipboard(links[linkIndex].url);
            handleHideContextMenu();
          }}
          icon={<FaRegCopy />}
          text={`Copy ${isFolder ? "Content" : ""}`}
        />

        <hr className="w-full border-light border-opacity-10" />
        <ContextMenuItem
          onClick={() => {
            isFolder ? setShowFolderCheckboxes(true) : setShowCheckboxes(true);
            handleHideContextMenu();
          }}
          icon={<MdOutlineCheckBox />}
          disabled={searchInput && true}
          text="Select"
        />
      </ul>
    </div>
  );
};

const ContextMenuItem = ({ icon, text, onClick, disabled }) => (
  <li
    className={`flex items-center text-[15px] cursor-pointer w-full 
     px-5 py-[6px] rounded transition duration-150 ease-in-out ${
       disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#444]"
     }`}
    onClick={(e) => {
      e.stopPropagation();
      disabled ? null : onClick();
    }}
  >
    <span className="mr-2 text-lg">{icon}</span>
    {text}
  </li>
);

export default ContextMenu;
