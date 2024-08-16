import PropTypes from "prop-types";
import React from "react";
import { useContextMenu } from "../../../hooks";
const ContextMenuItem = ({ icon, text, onClick, disabled, hidden }) => {
  const { handleHideContextMenu } = useContextMenu();
  const handleClick = (e, disabled, onClick) => {
    if (disabled) {
      return null;
    } else {
      handleHideContextMenu();
      onClick();
    }
  };
  return (
    <li
      className={`flex items-center cursor-pointer w-full px-6 py-2 text-base rounded transition duration-150 ease-in-out ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-white dark:hover:bg-[#444]"
      } ${hidden ? "hidden" : ""}`}
      onClick={(e) => handleClick(e, disabled, onClick)}
    >
      <span className="mr-2">{icon}</span>
      {text}
    </li>
  );
};

ContextMenuItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
};

export default ContextMenuItem;
