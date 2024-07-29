import PropTypes from "prop-types";

const ContextMenuItem = ({ icon, text, onClick, disabled, hidden }) => (
  <li
    className={`flex items-center text-sm cursor-pointer w-full px-6 py-[6px] rounded transition duration-150 ease-in-out ${
      disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-white dark:hover:bg-[#444]"
    } ${hidden ? "hidden" : ""}`}
    onClick={(e) => {
      e.stopPropagation();
      disabled ? null : onClick();
    }}
  >
    <span className="mr-2 text-base">{icon}</span>
    {text}
  </li>
);

ContextMenuItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
};

export default ContextMenuItem;
