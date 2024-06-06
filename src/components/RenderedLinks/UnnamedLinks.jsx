import React, { memo, useState, useEffect, useRef } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { FaBeerMugEmpty } from "react-icons/fa6";
import ContextMenu from "./ContextMenu";

const UnnamedLinks = ({
  handleCopy,
  handleDelete,
  links,
  inputIndex,
  setInputIndex,
  handleSubmit,
  editedValue,
  setEditedValue,
  correctUnnamedIndices,
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
  const unnamedLinks = links.filter((link) => !link.url_name);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setContextMenu({ visible: false, x: 0, y: 0, linkIndex: null });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const getFormattedLink = (link) => {
    return link.length > 40 ? link.substr(0, 40) + " ..." : link;
  };

  const handleName = (index) => {
    setInputIndex(`${index}-name`);
    setEditedValue("");
  };

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
            handleName={handleName}
            handleHideContextMenu={handleHideContextMenu}
            links={correctUnnamedIndices?.length ? links2 : links}
            onHide={handleHideContextMenu}
          />
        </div>
      )}

      {unnamedLinks.length > 0 && (
        <ul className="list-disc text-white list-inside pt-4">
          {unnamedLinks.map((link, index) => {
            const originalIndex = correctUnnamedIndices?.length > 0
              ? correctUnnamedIndices[index]
              : links.indexOf(link);
            {
              console.log(originalIndex);
            }
            return (
              <li
                key={originalIndex}
                className="select-none"
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
