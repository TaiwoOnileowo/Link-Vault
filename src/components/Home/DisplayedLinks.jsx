import React, { memo } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { TbPinFilled } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
import { useAppContext } from "../../Context/AppContext";
import { useLinkContext } from "../../Context/LinkContext";
import { useFolderContext } from "../../Context/FolderContext";
import Checkbox from "./Checkbox";

const DisplayedLinks = ({
  display,
  isSearchResults,
  isExistingLinks,
  openFolder,
}) => {
  const {
    handleSelect,
    handleCopyClick,
    copiedIndex,
    showCheckboxes,
    setIsFolder,
    setIsFolderLinks,
    isFolderLinks,
    isFolder,
  } = useLinkContext();
  // const { showFolderLinkCheckboxes } = useFolderContext();
  const { links, handleContextMenu } = useAppContext();

  const getFormattedName = (name) =>
    name.length > 38 ? `${name.substr(0, 38)} ...` : name;

  const getFormattedLink = (link) => {
    return link.length > 40 ? link.substr(0, 40) + " ..." : link;
  };

  return (
    <>
      <ul className="list-disc dark:text-white mb-4 text-black list-inside pt-2 h-full">
        {display?.map((link, index) => {
          const originalIndex = openFolder
            ? index
            : links.indexOf(link) ;
            console.log(originalIndex)
          return (
            <li
              key={originalIndex}
              className={`${
                isSearchResults ? "fade-up" : null
              } flex items-center gap-[2px] `}
              onContextMenu={(e) => {
                if (openFolder) {
                  setIsFolderLinks(true);
                  setIsFolder(false);
                }
                handleContextMenu(e, originalIndex);
              }}
            >
              {showCheckboxes ? (
                <Checkbox
                  link={link}
                  originalIndex={originalIndex}
                  isFolder={isFolder}
                />
              ) : (
                <GoDotFill className="dark:text-white text-black text-xs mt-2" />
              )}

              <div
                className={`${
                  isExistingLinks ? "text-[12px]" : "text-[15px] w-[430px]"
                } mt-2 inline-flex items-center gap-1  cursor-pointer`}
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
                    handleSelect(originalIndex);
                  }}
                >
                  {link.url_name
                    ? getFormattedName(link.url_name)
                    : getFormattedLink(link.url)}
                </a>
                <span className="dark:text-gray-300 text-gray-700">
                  {copiedIndex === originalIndex ? (
                    <MdCheckCircleOutline
                      className={`check-icon ${
                        copiedIndex === originalIndex ? "visible" : ""
                      }`}
                    />
                  ) : (
                    <FaRegCopy
                      className="copy-icon"
                      onClick={() => handleCopyClick(link.url, originalIndex)}
                    />
                  )}
                </span>
                {link.pinned && !isExistingLinks && (
                  <TbPinFilled className="dark:text-[#4c4c74] text-[#2a4ff6]" />
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {!display.length && isExistingLinks && (
        <p className="flex justify-center text-[11px]  text-dimWhite">
          Nothing here😐
        </p>
      )}
    </>
  );
};

export default memo(DisplayedLinks);
