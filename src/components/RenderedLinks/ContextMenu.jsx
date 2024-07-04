import React, { useEffect, useRef } from "react";
import { FaRegEdit, FaRegCopy } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { MdDriveFileRenameOutline } from "react-icons/md";
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
  } = useLinkContext();
  const { menu } = useAppContext();
  const x = contextMenu.x;
  const y = contextMenu.y;
  const visible = contextMenu.visible;
  const linkIndex = contextMenu.linkIndex;

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

  return (
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        zIndex: 1000,
      }}
      className="py-3 bg-[#333] text-white w-[120px] shadow-lg rounded-md"
    >
      <ul className="flex flex-col gap-1 w-full">
        <ContextMenuItem
          onClick={() =>
            handleEditClick(
              linkIndex,
              links[linkIndex]?.url_name
                ? links[linkIndex].url_name
                : links[linkIndex].url
            )
          }
          icon={<FaRegEdit size={19} className="mr-2" />}
          text="Edit"
        />

        <ContextMenuItem
          onClick={() => {
            handleDelete(linkIndex);
            handleHideContextMenu();
          }}
          icon={<AiOutlineDelete size={19} className="mr-2" />}
          text="Delete"
        />
        <ContextMenuItem
          onClick={() => {
            handleCopyToClipboard(links[linkIndex].url);
            handleHideContextMenu();
          }}
          icon={<FaRegCopy size={19} className="mr-2" />}
          text="Copy"
        />
        <ContextMenuItem
          onClick={() => {
            handleName(linkIndex);
            handleHideContextMenu();
          }}
          icon={<MdDriveFileRenameOutline size={19} className="mr-2" />}
          text="Name"
          disabled={menu === "named"}
        />
      </ul>
    </div>
  );
};

const ContextMenuItem = ({ onClick, icon, text, disabled }) => (
  <li
    className={`flex items-center text-[16px]  cursor-default w-full ${
      disabled ? "text-gray-500" : "hover:bg-[#444]"
    } px-4 py-1 rounded transition duration-150 ease-in-out`}
    onClick={!disabled ? onClick : undefined}
  >
    {icon} {text}
    {console.log(disabled)}
  </li>
);

export default ContextMenu;
