import React, { memo, useState, useRef, useEffect } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { FaBeerMugEmpty } from "react-icons/fa6";
import ContextMenu from "./ContextMenu";
import { useLinkContext } from "../../Context/LinkContext";
import { useAppContext } from "../../Context/AppContext";
const NamedLinks = ({ correctNamedIndices, links2 }) => {
  const {
    inputIndex,
    setInputIndex,
    handleSubmit,
    editedValue,
    contextMenu,
    contextMenuRef,
    handleContextMenu,
    handleCopyClick,
    copiedLink,
    handleEditInputChange,
  } = useLinkContext();
  const { links } = useAppContext();

  const namedLinks = links.filter((link) => link.url_name);

  const getFormattedName = (name) =>
    name.length > 45 ? `${name.substr(0, 45)} ...` : name;

  return (
    <>
      {contextMenu.visible && (
        <div ref={contextMenuRef}>
          <ContextMenu
            links={correctNamedIndices?.length > 0 ? links2 : links}
          />
        </div>
      )}
      {namedLinks.length > 0 && (
        <ul className="list-disc text-white list-inside pt-4">
          {namedLinks.map((link, index) => {
            const originalIndex =
              correctNamedIndices?.length > 0
                ? correctNamedIndices[index]
                : links.indexOf(link);

            return (
              <li
                key={originalIndex}
                className={correctNamedIndices?.length > 0 ? "fade-up" : null}
                onContextMenu={(e) => handleContextMenu(e, originalIndex)}
              >
                {inputIndex === `${originalIndex}-edit` ? (
                  <EditInput
                    link={link}
                    editedValue={editedValue}
                    handleEditInputChange={handleEditInputChange}
                    handleSubmit={handleSubmit}
                    originalIndex={originalIndex}
                    setInputIndex={setInputIndex}
                  />
                ) : (
                  <NormalLink
                    link={link}
                    copiedLink={copiedLink}
                    originalIndex={originalIndex}
                    getFormattedName={getFormattedName}
                    handleCopyClick={handleCopyClick}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
      {!namedLinks.length && links.length && (
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

const EditInput = ({
  link,
  editedValue,
  handleEditInputChange,
  handleSubmit,
  originalIndex,
  setInputIndex,
}) => (
  <div className="inline-flex items-center">
    <input
      type="text"
      value={editedValue}
      onChange={handleEditInputChange}
      name="url_name"
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
);

const NormalLink = ({
  link,
  copiedLink,
  originalIndex,
  getFormattedName,
  handleCopyClick,
}) => (
  <div className="text-[18px] mt-2 inline-flex items-center gap-2 w-[450px]">
    <a
      href={`${
        link.url.startsWith("https") || link.url.startsWith("http")
          ? link.url
          : "https://" + link.url
      }`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {getFormattedName(link.url_name)}
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
          onClick={() => handleCopyClick(link.url, originalIndex)}
        />
      )}
    </span>
  </div>
);

export default memo(NamedLinks);
