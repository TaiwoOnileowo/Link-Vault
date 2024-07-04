import React, { useState, useEffect } from "react";
import { FaBeerMugEmpty } from "react-icons/fa6";
import NamedLinks from "./NamedLinks";
import UnnamedLinks from "./UnnamedLinks";
import { useLinkContext } from "../../Context/LinkContext";
import { useAppContext } from "../../Context/AppContext";
const SearchResults = () => {
  useLinkContext();
  const { links, searchInput } = useAppContext();
  const [filteredIndices, setFilteredIndices] = useState({
    named: [],
    unnamed: [],
  });
  const lowerCaseSearchInput = searchInput.toLowerCase();

  useEffect(() => {
    const named = [];
    const unnamed = [];

    links.forEach((link, index) => {
      const match = link.url_name
        ? link.url_name.toLowerCase().includes(lowerCaseSearchInput)
        : link.url.toLowerCase().includes(lowerCaseSearchInput);
      // console.log(index)
      console.log(links);
      if (match) {
        // link.url_name ? named.push(index) : unnamed.push(index);
        if (link.url_name) {
          named.push(index);
          // console.log(named);
        } else {
          unnamed.push(index);
          // console.log(unnamed);
        }
      }
    });

    setFilteredIndices({ named, unnamed });
  }, [searchInput, links]);

  return (
    <>
      {filteredIndices.named.length > 0 && (
        <NamedLinks
          correctNamedIndices={filteredIndices.named}
          links2={links}
        />
      )}{" "}
      {filteredIndices.unnamed.length > 0 && (
        <UnnamedLinks
          correctUnnamedIndices={filteredIndices.unnamed}
          links2={links}
        />
      )}
      {!filteredIndices.unnamed.length && !filteredIndices.named.length && (
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
