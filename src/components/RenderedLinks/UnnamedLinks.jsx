import React, { memo } from "react";
import { MdCheckCircleOutline, MdOutlineCancel } from "react-icons/md";
import { FaBeerMugEmpty } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";
import { TbPinFilled } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
import ContextMenu from "./ContextMenu";
import { useAppContext } from "../../Context/AppContext";
import { useLinkContext } from "../../Context/LinkContext";

const UnnamedLinks = ({ correctUnnamedIndices, links2 }) => {
  const {
    inputIndex,
    setInputIndex,
    handleSubmit,
    editedValue,
    setEditedValue,
    contextMenu,
    contextMenuRef,
    handleContextMenu,
    handleCopyClick,
    copiedLink,
    handleEditInputChange,
  } = useLinkContext();
  const { links, darkMode } = useAppContext();

  const unnamedLinks = links2?.length > 0
    ? links2.filter((link) => !link.url_name)
    : links.filter((link) => !link.url_name);

  const getFormattedLink = (link) => {
    return link.length > 40 ? link.substr(0, 40) + " ..." : link;
  };
  const sortedLinks = unnamedLinks.sort((a, b) => b.pinned - a.pinned);
  const handleName = (index) => {
    setInputIndex(`${index}-name`);
    setEditedValue("");
  };

  return (
    <>
      {contextMenu.visible && (
        <div ref={contextMenuRef}>
          <ContextMenu
            handleName={handleName}
            links={correctUnnamedIndices?.length > 0 ? links2 : links}
          />
        </div>
      )}

      {sortedLinks.length > 0 && (
        <ul className="list-disc dark:text-white text-black list-inside pt-4 h-full">
          {sortedLinks.map((link, index) => {
            const originalIndex =
              correctUnnamedIndices?.length > 0
                ? correctUnnamedIndices[index]
                : links.indexOf(link);

            return (
              <li
                key={originalIndex}
                className={`${
                  correctUnnamedIndices?.length > 0 ? "fade-up" : null
                } flex items-center gap-[2px]`}
                onContextMenu={(e) => handleContextMenu(e, originalIndex)}
              >
                <GoDotFill className="dark:text-white text-black text-xs mt-2" />
                {inputIndex === `${originalIndex}-name` ? (
                  // Unnamed Link - Adding Name
                  <div className="text-[15px] inline-flex items-end">
                    <input
                      type="text"
                      value={editedValue}
                      onChange={handleEditInputChange}
                      placeholder="Give it a name"
                      className={`outline-none  bg-light dark:bg-[#151f29] ${
                        link.url.length > 20 ? "w-[320px]" : "w-[200px]"
                      } dark:text-white text-black pl-2 p-[2px] mt-2 rounded-md`}
                      autoFocus
                    />
                    <div>
                      <button
                        onClick={() => handleSubmit(originalIndex, editedValue)}
                        className="dark:text-white text-black rounded-[5px] ml-1 pr-1 "
                        type="submit"
                      >
                        <TiTickOutline />
                      </button>
                      <button
                        onClick={() => {
                          setInputIndex(null);
                        }}
                        className="dark:text-primary text-[#2a4ff6] rounded-[5px]"
                      >
                        <MdOutlineCancel />
                      </button>
                    </div>
                  </div>
                ) : inputIndex === `${originalIndex}-edit` ? (
                  // Unnamed Link - Editing Link
                  <div className="text-[15px] flex h-full items-end">
                    <input
                      type="text"
                      value={editedValue}
                      onChange={handleEditInputChange}
                      name="url"
                      className={`outline-none bg-light dark:bg-[#151f29] ${
                        link.url.length > 20 ? "w-[320px]" : "w-[200px]"
                      } dark:text-white text-black pl-2 p-[2px] mt-2 rounded-md`}
                      autoFocus
                    />
                    <div>
                      <button
                        onClick={() =>
                          handleSubmit(originalIndex, editedValue, true)
                        }
                        className="dark:text-white text-black rounded-[5px] ml-1 pr-1"
                        type="submit"
                      >
                        <TiTickOutline />
                      </button>
                      <button
                        onClick={() => {
                          setInputIndex(null);
                        }}
                        className="dark:text-primary text-[#2a4ff6] rounded-[5px]"
                      >
                        <MdOutlineCancel />
                      </button>
                    </div>
                  </div>
                ) : (
                  // Unnamed Link - Normal State
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
                    >
                      {getFormattedLink(link.url)}
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
                )}
              </li>
            );
          })}
        </ul>
      )}
      {!sortedLinks.length && links.length && (
        <div
          className={`bg-${
            darkMode ? "dark" : "white"
          } h-[50%] bg-opacity-50 flex flex-col items-center justify-center py-4 mt-4 shadow-xl`}
        >
          <FaBeerMugEmpty className="w-24 h-24 dark:text-[#d5ebff] text-[#2a4ff6]" />
          <h2 className="dark:text-white text-black text-[28px] font-semibold pb-4">
            Nothing Here😐...
          </h2>
        </div>
      )}
    </>
  );
};

export default memo(UnnamedLinks);
