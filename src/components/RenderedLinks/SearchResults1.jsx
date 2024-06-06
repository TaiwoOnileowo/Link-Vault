import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { FaBeerMugEmpty } from "react-icons/fa6";
import ContextMenu from "./ContextMenu";
const SearchResults = ({
  searchInput,
  links,
  handleCopy,
  handleDelete,
  handleSubmit,
  inputIndex,
  setInputIndex,
  editedValue,
  setEditedValue,
}) => {
  const lowerCaseSearchInput = searchInput.toLowerCase();

  const filteredLinks = links.filter((link) =>
    // Convert both URL and custom name to lowercase for case-insensitive search
    link.url_name && !link.url_name.trim().includes("http")
      ? link.url_name.toLowerCase().includes(lowerCaseSearchInput)
      : link.url.toLowerCase().includes(lowerCaseSearchInput)
  );

  const getFormattedLink = (link) => {
    return link.length > 40 ? link.substr(0, 40) + " ..." : link;
  };

  const getFormattedName = (name) => {
    return name.length > 35 ? name.substr(0, 35) + " ..." : name;
  };



  return (
    <>
      {filteredLinks.length > 0 && (
        <ul className="list-disc text-white list-inside pt-4">
          {filteredLinks.map((link) => {
            const originalIndex = links.indexOf(link);
            return (
              <li key={originalIndex} className="select-none">
                {link.url_name ? (
                  // Named Links Editing
                  editingIndex === originalIndex ? (
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
                    </div>
                  ) : (
                    // Normal Named Links
                    <div
                      className="text-[18px] mt-2 inline-flex items-center gap-2"
                      onMouseEnter={() => handleMouseEnter(originalIndex)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getFormattedName(link.url_name)}
                      </a>
                      <AiOutlineDelete
                        className="cursor-pointer"
                        onClick={() => handleDelete(originalIndex)}
                      />
                      {hoveredIndex === originalIndex && (
                        <>
                          <FaRegEdit
                            className="cursor-pointer"
                            onClick={() =>
                              handleEditClick(originalIndex, link.url_name)
                            }
                          />
                          <button
                            className="border-white border rounded-[5px] px-2 copy"
                            onClick={() => handleCopy(link.url, originalIndex)}
                          >
                            {copiedIndex === originalIndex ? (
                              <FaCheck className="my-[2px] mx-[2px] text-[#2a4ff6] copy-button" />
                            ) : (
                              "copy"
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  )
                ) : inputIndex === `${originalIndex}-name` ? (
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
                      onClick={() => setInputIndex(null)}
                      className="ml-2 border-white border rounded-[5px] px-2 text-[14px]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : inputIndex === `${originalIndex}-edit` ? (
                  // Unnamed Link - Editing URL
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
                      onClick={() => setInputIndex(null)}
                      className="ml-2 border-white border rounded-[5px] px-2 text-[14px]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  // Unnamed Link - Normal State
                  <div
                    className="text-[18px] mt-2 inline-flex items-center gap-2 w-[508px]"
                    onDoubleClick={() => handleDoubleClick(originalIndex)}
                    onMouseEnter={() => handleMouseEnter(originalIndex)}
                    onMouseLeave={handleMouseLeave}
                  >
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
                    <AiOutlineDelete
                      className="cursor-pointer"
                      onClick={() => handleDelete(originalIndex)}
                    />
                    {hoveredIndex === originalIndex && (
                      <>
                        <FaRegEdit
                          className="cursor-pointer"
                          onClick={() => {
                            handleEditClick(originalIndex, link.url);
                            setInputIndex(`${originalIndex}-edit`);
                          }}
                        />
                        <button
                          className="border-white border rounded-[5px] px-2 copy"
                          onClick={() => handleCopy(link.url, originalIndex)}
                        >
                          {copiedIndex === originalIndex ? (
                            <FaCheck className="my-[2px] mx-[2px] text-[#2a4ff6] copy-button" />
                          ) : (
                            "copy"
                          )}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {!filteredLinks.length && (
        <div className="bg-[#242425] bg-opacity-50 items-center gap-4 flex flex-col justify-center py-[10px] mt-4 shadow-xl">
          <FaBeerMugEmpty className="w-24 h-24 text-[#d5ebff]" />
          <h2 className="text-white text-[28px] font-semibold pb-4">
            Nothing Found😐...
          </h2>
        </div>
      )}
    </>
  );
};

export default SearchResults;
