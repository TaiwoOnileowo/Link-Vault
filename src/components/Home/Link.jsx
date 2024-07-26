import { useLinkContext } from "../../context";
import { MdCheckCircleOutline } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { TbPinFilled } from "react-icons/tb";
import {
  getFormattedLink,
  getFormattedName,
} from "../../utils/stringFormatters";
import propTypes from "prop-types";
const Link = ({ isExistingLinks, link, index }) => {
  Link.propTypes = {
    isExistingLinks: propTypes.bool,
    link: propTypes.object.isRequired,
    index: propTypes.number.isRequired,
  };
  const { showCheckboxes, handleSelect, copiedIndex, handleCopyClick } =
    useLinkContext();

  return (
    <div
      className={`${
        isExistingLinks ? "text-[12px]" : "text-[15px] w-[430px]"
      } mt-2 inline-flex items-center gap-1  cursor-pointer ${
        link.selected ? "opacity-80 text-[#007bff] shadow-sm" : "text-white"
      }`}
    >
      <a
        href={`${
          link.url.startsWith("https") || link.url.startsWith("http")
            ? link.url
            : "https://" + link.url
        }`}
        target="_blank"
        rel="noopener noreferrer"
        title="Right click"
        className="dark:text-white text-black"
        onClick={(e) => {
          showCheckboxes && e.preventDefault();
          handleSelect(index);
        }}
      >
        {link.url_name
          ? getFormattedName(link.url_name)
          : getFormattedLink(link.url)}
      </a>
      <span className="dark:text-gray-300 text-gray-700">
        {copiedIndex === index ? (
          <MdCheckCircleOutline
            className={`check-icon ${copiedIndex === index ? "visible" : ""}`}
          />
        ) : (
          <FaRegCopy
            className="copy-icon"
            onClick={() => handleCopyClick(link.url, index)}
          />
        )}
      </span>
      {link.pinned && !isExistingLinks && (
        <TbPinFilled className="dark:text-[#4c4c74] text-[#122ca3]" />
      )}
    </div>
  );
};

export default Link;
