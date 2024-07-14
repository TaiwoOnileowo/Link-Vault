import React, { memo } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import { FaBeerMugEmpty, FaAnglesDown } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa";
import { TbPinFilled } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
import ContextMenu from "../Layout/ContextMenu";
import { useAppContext } from "../../Context/AppContext";
import { useLinkContext } from "../../Context/LinkContext";
import { RiDeleteBin6Line } from "react-icons/ri";

const DisplayedLinks = ({ searchResults }) => {
  const {
    setShowCheckboxes,
    handleSelect,
    contextMenu,
    contextMenuRef,
    handleContextMenu,
    handleCopyClick,
    copiedLink,
    loadMore,
    getPaginatedLinks,
    indexOfLastLink,
    showCheckboxes,
    handleBulkCopy,
    handleBulkDelete,
    handleSelectAll,
    selectedMenu,
  } = useLinkContext();
  const { links, setLinks, menu } = useAppContext();

  const unnamedLinks = links.filter((link) => !link.url_name);
  const namedLinks = links.filter((link) => link.url_name);

  const sortedUnnamedLinks = unnamedLinks.sort((a, b) => b.pinned - a.pinned);
  const sortedNamedLinks = namedLinks.sort((a, b) => b.pinned - a.pinned);
  const displayedLinks = getPaginatedLinks(
    menu === "named" ? sortedNamedLinks : sortedUnnamedLinks
  );

  const linksSelected = links.filter((link) => link.selected);
  const getFormattedName = (name) =>
    name.length > 38 ? `${name.substr(0, 38)} ...` : name;

  const getFormattedLink = (link) => {
    return link.length > 40 ? link.substr(0, 40) + " ..." : link;
  };
  return (
    <>
      {contextMenu.visible && (
        <div ref={contextMenuRef}>
          <ContextMenu links={links} />
        </div>
      )}

      {displayedLinks.length > 0 ? (
        <>
          {showCheckboxes && menu === selectedMenu && (
            <div className="flex justify-between w-full mt-2 text-sm dark:text-white">
              <p>{linksSelected.length} selected</p>
              <div className="flex gap-4">
                <button onClick={handleBulkCopy}>
                  <FaRegCopy size={18} />
                </button>
                <button onClick={() => handleBulkDelete(menu)}>
                  <RiDeleteBin6Line size={18} />
                </button>
                <button onClick={() => handleSelectAll(menu)}>
                  {linksSelected.length ===
                  (menu === "unnamed" ? unnamedLinks : namedLinks).length
                    ? "Unselect all"
                    : "Select all"}
                </button>
                <button
                  onClick={() => {
                    setShowCheckboxes(false);
                    setLinks((prevLinks) =>
                      prevLinks.map((link) => ({ ...link, selected: false }))
                    );
                  }}
                  className="border border-white px-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <ul className="list-disc dark:text-white mb-4 text-black list-inside pt-2 h-full">
            {(searchResults || displayedLinks).map((link, index) => {
              const originalIndex = links.indexOf(link);

              return (
                <li
                  key={originalIndex}
                  className={`${
                    searchResults?.length > 0 ? "fade-up" : null
                  } flex items-center gap-[2px] `}
                  onContextMenu={(e) => handleContextMenu(e, originalIndex)}
                >
                  {showCheckboxes && menu === selectedMenu ? (
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="mt-2"
                      checked={link.selected}
                      onChange={() => handleSelect(originalIndex)}
                    />
                  ) : (
                    <GoDotFill className="dark:text-white text-black text-xs mt-2" />
                  )}

                  <div className="text-[15px] mt-2 inline-flex items-center gap-1 w-[430px] cursor-pointer">
                    <a
                      href={`${
                        link.url.startsWith("https") ||
                        link.url.startsWith("http")
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
                      {searchResults
                        ? link.url_name
                          ? getFormattedName(link.url_name)
                          : getFormattedLink(link.url)
                        : menu === "named"
                        ? getFormattedName(link.url_name)
                        : getFormattedLink(link.url)}
                    </a>
                    <span className="dark:text-gray-300 text-gray-700">
                      {copiedLink === originalIndex ? (
                        <MdCheckCircleOutline
                          size={21}
                          className={`check-icon ${
                            copiedLink === originalIndex ? "visible" : ""
                          }`}
                        />
                      ) : (
                        <FaRegCopy
                          className="copy-icon"
                          onClick={() =>
                            handleCopyClick(link.url, originalIndex)
                          }
                        />
                      )}
                    </span>
                    {link.pinned && (
                      <TbPinFilled className="dark:text-[#4c4c74] text-[#2a4ff6]" />
                    )}
                  </div>
                </li>
              );
            })}
            {indexOfLastLink < links.length && (
              <div className="flex w-[430px] justify-center ">
                <button
                  onClick={loadMore}
                  className="dark:text-white dark:hover:scale-[1.1] text-[15px] hover:shadow-2xl transition-all duration-300 ease animate-pulse hover:animate-none"
                >
                  <FaAnglesDown />
                </button>
              </div>
            )}
          </ul>
        </>
      ) : (
        links.length > 0 && (
          <div
            className={`bg-white dark:bg-dark h-[50%] bg-opacity-50 flex flex-col items-center justify-center py-4 mt-4 shadow-xl`}
          >
            <FaBeerMugEmpty className="w-24 h-24 dark:text-[#d5ebff] text-[#2a4ff6]" />
            <h2 className="dark:text-white text-black text-[28px] font-semibold pb-4">
              Nothing Here😐...
            </h2>
          </div>
        )
      )}
    </>
  );
};

export default memo(DisplayedLinks);
