import React, { memo } from "react";
import { MdCheckCircleOutline, MdOutlineCancel } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { FaBeerMugEmpty } from "react-icons/fa6";
import { TiTickOutline } from "react-icons/ti";
import { TbPinFilled } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
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
  const { links, darkMode } = useAppContext();

  const namedLinks = links2
    ? links2.filter((link) => link.url_name)
    : links.filter((link) => link.url_name);
  const sortedLinks = namedLinks.sort((a, b) => b.pinned - a.pinned);

  const getFormattedName = (name) =>
    name.length > 38 ? `${name.substr(0, 38)} ...` : name;

  return (
    <>
      {contextMenu.visible && (
        <div ref={contextMenuRef}>
          <ContextMenu
            links={correctNamedIndices?.length > 0 ? links2 : links}
          />
        </div>
      )}
      {sortedLinks.length > 0 && (
        <ul className="list-disc dark:text-white text-black list-inside pt-4">
          {sortedLinks.map((link, index) => {
            const originalIndex =
              correctNamedIndices?.length > 0
                ? correctNamedIndices[index]
                : links.indexOf(link);

            return (
              <li
                key={originalIndex}
                className={`${
                  correctNamedIndices?.length > 0 ? "fade-up" : null
                }  flex items-center gap-[2px]`}
                onContextMenu={(e) => handleContextMenu(e, originalIndex)}
              >
                <GoDotFill className="dark:text-white text-black text-xs mt-2" />
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

const EditInput = ({
  link,
  editedValue,
  handleEditInputChange,
  handleSubmit,
  originalIndex,
  setInputIndex,
}) => (
  <div className="text-[15px] inline-flex items-end">
    <input
      type="text"
      value={editedValue}
      onChange={handleEditInputChange}
      name="url_name"
      className={`outline-none bg-light dark:bg-[#151f29] ${
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
);
const NormalLink = ({
  link,
  copiedLink,
  originalIndex,
  getFormattedName,
  handleCopyClick,
}) => (
  <div className="text-[15px] mt-2 inline-flex items-center gap-1 w-[430px]">
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
    >
      {getFormattedName(link.url_name)}
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
          onClick={() => handleCopyClick(link.url, originalIndex)}
        />
      )}
    </span>
    {link.pinned && (
      <TbPinFilled className="dark:text-[#4c4c74] text-[#2a4ff6]" />
    )}
  </div>
);
export default memo(NamedLinks);
