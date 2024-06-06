import React, { memo, useState, useRef, useEffect } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { FaBeerMugEmpty } from "react-icons/fa6";
import ContextMenu from "./ContextMenu";

const NamedLinks = ({
  handleCopy,
  handleDelete,
  links,
  editedValue,
  handleSubmit,
  setEditedValue,
  inputIndex,
  setInputIndex,
  correctNamedIndices,
  links2,
}) => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    linkIndex: null,
  });
  const [copiedLink, setCopiedLink] = useState(null);
  const contextMenuRef = useRef();

  const namedLinks = links.filter((link) => link.url_name);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setContextMenu({ visible: false, x: 0, y: 0, linkIndex: null });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleContextMenu = (e, index) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      linkIndex: index,
    });
  };

  const handleHideContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleEditClick = (index, currentValue = "") => {
    handleHideContextMenu();
    setInputIndex(`${index}-edit`);
    setEditedValue(currentValue);
  };

  const handleCopyClick = (url, index) => {
    setCopiedLink(index);
    handleCopy(url);
    setTimeout(() => {
      setCopiedLink(null);
    }, 3000);
  };

  const getFormattedName = (name) => (name.length > 45 ? `${name.substr(0, 45)} ...` : name);

  const handleEditInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  return (
    <>
      {contextMenu.visible && (
        <div ref={contextMenuRef}>
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            visible={contextMenu.visible}
            onEdit={handleEditClick}
            onDelete={handleDelete}
            onCopy={handleCopy}
            linkIndex={contextMenu.linkIndex}
            handleHideContextMenu={handleHideContextMenu}
            links={correctNamedIndices?.length > 0 ? links2 : links}
            onHide={handleHideContextMenu}
          />
        </div>
      )}
      {namedLinks.length > 0 && (
        <ul className="list-disc text-white list-inside pt-4">
          {namedLinks.map((link, index) => {
            const originalIndex = correctNamedIndices?.length > 0
              ? correctNamedIndices[index]
              : links.indexOf(link);
            return (
              <li
                key={originalIndex}
                className="select-none"
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

const EditInput = ({ link, editedValue, handleEditInputChange, handleSubmit, originalIndex, setInputIndex }) => (
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

const NormalLink = ({ link, copiedLink, originalIndex, getFormattedName, handleCopyClick }) => (
  <div className="text-[18px] mt-2 inline-flex items-center gap-2 w-[450px]">
    <a href={link.url} target="_blank" rel="noopener noreferrer">
      {getFormattedName(link.url_name)}
    </a>
    <span className="text-gray-300">
      {copiedLink === originalIndex ? (
        <MdCheckCircleOutline
          size={21}
          className={`check-icon ${copiedLink === originalIndex ? "visible" : ""}`}
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
