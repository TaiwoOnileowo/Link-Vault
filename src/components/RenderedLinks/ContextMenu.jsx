import React, { useEffect, useRef } from "react";
import { FaRegEdit, FaRegCopy } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { MdDriveFileRenameOutline } from "react-icons/md";
// import { BsPinAngle } from "react-icons/bs";
import { GrPin } from "react-icons/gr";

import { RiUnpinLine } from "react-icons/ri";
import { useLinkContext } from "../../Context/LinkContext";
import { useAppContext } from "../../Context/AppContext";

const ContextMenu = ({ handleName, links }) => {
  const menuRef = useRef(null);
  const {
    contextMenu,
    handleEditClick,
    handleDelete,
    handleCopyToClipboard,
    handleHideContextMenu,
    handlePinClick,
  } = useLinkContext();
  const { menu } = useAppContext();
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

  if (!links || linkIndex === null || linkIndex === undefined || !links[linkIndex]) {
    return null;
  }

  return (
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        zIndex: 1000,
      }}
      className="py-3 bg-[#333] text-white w-[150px] shadow-lg rounded-md"
    >
      <ul className="flex flex-col w-full">
        <ContextMenuItem
          onClick={() =>
            handleEditClick(
              linkIndex,
              links[linkIndex]?.url_name
                ? links[linkIndex].url_name
                : links[linkIndex].url
            )
          }
          icon={<FaRegEdit />}
          text="Edit"
        />
        <ContextMenuItem
          onClick={() => {
            handleDelete(linkIndex);
            handleHideContextMenu();
          }}
          icon={<AiOutlineDelete />}
          text="Delete"
        />
        <ContextMenuItem
          onClick={() => {
            handlePinClick(linkIndex);
            handleHideContextMenu();
          }}
          icon={links[linkIndex].pinned ? <RiUnpinLine /> : <GrPin />}
          text={links[linkIndex].pinned ? "Unpin" : "Pin"}
        />
        <ContextMenuItem
          onClick={() => {
            handleCopyToClipboard(links[linkIndex].url);
            handleHideContextMenu();
          }}
          icon={<FaRegCopy />}
          text="Copy"
        />
        <ContextMenuItem
          onClick={() => {
            handleName(linkIndex);
            handleHideContextMenu();
          }}
          icon={<MdDriveFileRenameOutline />}
          text="Name"
          disabled={menu === "named"}
        />
      </ul>
    </div>
  );
};

const ContextMenuItem = ({ onClick, icon, text, disabled }) => (
  <li
    className={`flex items-center text-[15px] cursor-pointer w-full ${
      disabled ? "text-gray-500" : "hover:bg-[#444]"
    } px-4 py-2 rounded transition duration-150 ease-in-out`}
    onClick={!disabled ? onClick : undefined}
  >
    <span className="mr-2">{icon}</span>
    {text}
  </li>
);

export default ContextMenu;
