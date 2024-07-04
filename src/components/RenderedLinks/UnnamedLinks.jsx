import React, { memo, useState, useEffect, useRef } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { FaBeerMugEmpty } from "react-icons/fa6";
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
  const { links } = useAppContext();

  const unnamedLinks = links.filter((link) => !link.url_name);

  const getFormattedLink = (link) => {
    return link.length > 40 ? link.substr(0, 40) + " ..." : link;
  };

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

      {unnamedLinks.length > 0 && (
        <ul className="list-disc text-white list-inside pt-4">
          {unnamedLinks.map((link, index) => {
            const originalIndex =
              correctUnnamedIndices?.length > 0
                ? correctUnnamedIndices[index]
                : links.indexOf(link);

            return (
              <li
                key={originalIndex}
                className={correctUnnamedIndices?.length > 0 ? "fade-up" : null}
                onContextMenu={(e) => handleContextMenu(e, originalIndex)}
              >
                {inputIndex === `${originalIndex}-name` ? (
                  // Unnamed Link - Adding Name
                  <div className="inline-flex items-center">
                    <input
                      type="text"
                      value={editedValue}
                      onChange={handleEditInputChange}
                      placeholder="Give it a name"
                      className={`outline-none text-[18px] bg-[#151f29] ${
                        link.url.length > 20 ? "w-[350px]" : "w-[200px]"
                      } text-white pl-2 p-[2px] mt-2 rounded-md`}
                      autoFocus
                    />
                    <button
                      onClick={() => handleSubmit(originalIndex, editedValue)}
                      className="ml-2 border-[#2a4ff6] border rounded-[5px] px-2 text-[14px]"
                      type="submit"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => {
                        setInputIndex(null);
                      }}
                      className="ml-2 border-white border rounded-[5px] px-2 text-[14px]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : inputIndex === `${originalIndex}-edit` ? (
                  // Unnamed Link - Editing Link
                  <div className="inline-flex items-center">
                    <input
                      type="text"
                      value={editedValue}
                      onChange={handleEditInputChange}
                      name="url"
                      className={`outline-none text-[18px] bg-[#151f29] ${
                        link.url.length > 20 ? "w-[350px]" : "w-[200px]"
                      } text-white pl-2 p-[2px] mt-2 rounded-md`}
                      autoFocus
                    />
                    <button
                      onClick={() =>
                        handleSubmit(originalIndex, editedValue, true)
                      }
                      className="ml-2 border-[#2a4ff6] border rounded-[5px] px-2 text-[14px]"
                      type="submit"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => {
                        setInputIndex(null);
                      }}
                      className="ml-2 border-white border rounded-[5px] px-2 text-[14px]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  // Unnamed Link - Normal State
                  <div className="text-[18px] mt-2 inline-flex items-center gap-2  w-[450px]">
                    <a
                      href={`${
                        link.url.startsWith("https") ||
                        link.url.startsWith("http")
                          ? link.url
                          : "https://" + link.url
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getFormattedLink(link.url)}
                    </a>
                    <span className="text-gray-300">
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
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {!unnamedLinks.length && links.length && (
        <div className="bg-[#242425] bg-opacity-50 items-center gap-4 flex flex-col justify-center py-[10px] mt-4 shadow-xl">
          <FaBeerMugEmpty className="w-24 h-24 text-[#d5ebff]" />
          <h2 className="text-white text-[28px] font-semibold pb-4">
            Nothing Here😐...
          </h2>
        </div>
      )}
    </>
  );
};

export default memo(UnnamedLinks);
