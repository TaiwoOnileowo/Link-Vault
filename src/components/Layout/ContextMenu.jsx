import React, { useEffect, useRef } from "react";
import { FaRegEdit, FaRegCopy } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCheckBox } from "react-icons/md";
import { GrPin } from "react-icons/gr";
import { RiUnpinLine } from "react-icons/ri";
import { useLinkContext } from "../../Context/LinkContext";
import { useAppContext } from "../../Context/AppContext";

const ContextMenu = ({ links }) => {
  const menuRef = useRef(null);
  const {
    setShowCheckboxes,
    contextMenu,
    handleDelete,
    handleCopyToClipboard,
    handleHideContextMenu,
    handlePinClick,
    setSelectedMenu,
  } = useLinkContext();
  const { openModal, setLinks, menu, searchInput } = useAppContext();
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
      className="py-1 bg-[#333] animate-slide-down overflow-hidden text-white w-[120px] shadow-lg rounded-md"
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="flex flex-col w-full">
        <ContextMenuItem
          onClick={() => {
            const linkDetails = {
              url: links[linkIndex].url,
              url_name: links[linkIndex].url_name,
              pinned: links[linkIndex].pinned,
              selected: links[linkIndex].selected,
            };

            openModal("Edit Link", linkDetails);
            handleHideContextMenu();
          }}
          icon={<FaRegEdit />}
          text="Edit"
        />
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

        <hr className="w-full border-light border-opacity-10" />
        <ContextMenuItem
          onClick={() => {
            setLinks((prevLinks) =>
              prevLinks.map((link) => ({ ...link, selected: false }))
            );
            setSelectedMenu(menu);
            setShowCheckboxes(true);
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
     px-4 py-[6px] rounded transition duration-150 ease-in-out ${
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
