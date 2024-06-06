import React, { useEffect, useRef } from "react";
import { FaRegEdit, FaRegCopy } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { MdDriveFileRenameOutline } from "react-icons/md";

const ContextMenu = ({
  x,
  y,
  visible,
  onEdit,
  onDelete,
  onCopy,
  linkIndex,
  handleName,
  links,
  onHide,
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (menu) {
      const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
      const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menu;

      let adjustedX = x;
      let adjustedY = y;

      if (x + menuWidth > windowWidth) {
        adjustedX = windowWidth - menuWidth - 10;
      }

      if (y + menuHeight > windowHeight) {
        adjustedY = windowHeight - menuHeight - 10;
      }

      menu.style.left = `${adjustedX}px`;
      menu.style.top = `${adjustedY}px`;
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
            onEdit(
              linkIndex,
              links[linkIndex].url_name
                ? links[linkIndex].url_name
                : links[linkIndex].url
            )
          }
          icon={<FaRegEdit size={19} className="mr-2" />}
          text="Edit"
        />
        <ContextMenuItem
          onClick={() => {
            onDelete(linkIndex);
            onHide();
          }}
          icon={<AiOutlineDelete size={19} className="mr-2" />}
          text="Delete"
        />
        <ContextMenuItem
          onClick={() => {
            onCopy(links[linkIndex].url);
            onHide();
          }}
          icon={<FaRegCopy size={19} className="mr-2" />}
          text="Copy"
        />
        <ContextMenuItem
          onClick={() => {
            handleName(linkIndex);
            onHide();
          }}
          icon={<MdDriveFileRenameOutline size={19} className="mr-2" />}
          text="Name"
          disabled={!!links[linkIndex].url_name}
        />
      </ul>
    </div>
  );
};

const ContextMenuItem = ({ onClick, icon, text, disabled }) => (
  <li
    className={`flex items-center text-[16px] cursor-default w-full ${
      disabled ? "text-gray-500" : "hover:bg-[#444]"
    } px-4 py-[6px] rounded transition duration-150 ease-in-out`}
    onClick={!disabled ? onClick : undefined}
  >
    {icon} {text}
  </li>
);

export default ContextMenu;
