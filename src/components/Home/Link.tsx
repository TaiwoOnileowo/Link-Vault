import { useLinkContext, useAppContext } from "../../context";
import { MdCheckCircleOutline } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { TbPinFilled } from "react-icons/tb";
import { getFormattedLink } from "../../utils/stringFormatters";
import React from "react";
import {LinkContextProps, Links } from "../../types";
import usePreviewLink from "../../hooks/usePreviewLink";
const Link = ({
  isExistingLinks,
  link,
  index,
}: {
  isExistingLinks?: boolean;
  link: Links;
  index: number;
}) => {
  const { showCheckboxes, handleSelect, copiedIndex, handleCopyClick } =
    useLinkContext() as LinkContextProps;
  const { handleHover, handleHidePreviewLink } = usePreviewLink();

  return (
    <div
      className={`${
        isExistingLinks ? "text-[12px]" : "text-[15px] w-[430px]"
      }  inline-flex items-center gap-1  cursor-pointer text-black ${
        link.selected ? "bg-opacity-20  shadow-sm bg-gray-500 p-1" : "text-white mt-2"
      }`}
      onMouseEnter={(e) => {
        handleHover(e, index);
      }}
      onMouseLeave={handleHidePreviewLink}
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
          if (showCheckboxes) {
            e.preventDefault();
            handleSelect(index);
          }
        }}
      >
        {link.url_name
          ? getFormattedLink(link.url_name)
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
