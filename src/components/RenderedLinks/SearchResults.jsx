import React, { useState, useEffect } from "react";
import { FaBeerMugEmpty } from "react-icons/fa6";
import NamedLinks from "./NamedLinks";
import UnnamedLinks from "./UnnamedLinks";

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
  const [filteredIndices, setFilteredIndices] = useState({ named: [], unnamed: [] });
  const lowerCaseSearchInput = searchInput.toLowerCase();

  useEffect(() => {
    const named = [];
    const unnamed = [];

    links.forEach((link, index) => {
      const match = link.url_name 
        ? link.url_name.toLowerCase().includes(lowerCaseSearchInput)
        : link.url.toLowerCase().includes(lowerCaseSearchInput);

      if (match) {
        link.url_name ? named.push(index) : unnamed.push(index);
      }
    });

    setFilteredIndices({ named, unnamed });
  }, [searchInput, links]);

  return (
    <>
      {filteredIndices.named.length > 0 || filteredIndices.unnamed.length > 0 ? (
        <>
          <NamedLinks
            handleCopy={handleCopy}
            handleDelete={handleDelete}
            links={filteredIndices.named.map(index => links[index])}
            editedValue={editedValue}
            handleSubmit={handleSubmit}
            setEditedValue={setEditedValue}
            setInputIndex={setInputIndex}
            inputIndex={inputIndex}
            correctIndices={filteredIndices.named}
          />
          <UnnamedLinks
            handleCopy={handleCopy}
            handleDelete={handleDelete}
            links={filteredIndices.unnamed.map(index => links[index])}
            editedValue={editedValue}
            handleSubmit={handleSubmit}
            setEditedValue={setEditedValue}
            setInputIndex={setInputIndex}
            inputIndex={inputIndex}
            correctIndices={filteredIndices.unnamed}
          />
        </>
      ) : (
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
