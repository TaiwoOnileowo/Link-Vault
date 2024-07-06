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
  const [filteredLinks, setFilteredLinks] = useState([]);
  const lowerCaseSearchInput = searchInput.toLowerCase();

  useEffect(() => {
    const named = [];
    const unnamed = [];
    const newFilteredLinks = [];

    links.forEach((link, index) => {
      const linkText = link.url_name || link.url;
      const matchPosition = linkText.toLowerCase().indexOf(lowerCaseSearchInput);
      console.log(matchPosition)
      if (matchPosition !== -1) {
        newFilteredLinks.push({ link, matchPosition });
        if (link.url_name) {
          named.push(index);
        } else {
          unnamed.push(index);
        }
      }
    });

    // Sort by match position
    newFilteredLinks.sort((a, b) => a.matchPosition - b.matchPosition);

    // Extract sorted links
    const sortedLinks = newFilteredLinks.map(item => item.link);

    setFilteredIndices({ named, unnamed });
    setFilteredLinks(sortedLinks);
  }, [searchInput, links]);

  return (
    <>
      {filteredIndices.named.length > 0 && (
        <NamedLinks
          correctNamedIndices={filteredIndices.named}
          links2={filteredLinks}
        />
      )}
      {filteredIndices.unnamed.length > 0 && (
        <UnnamedLinks
          correctUnnamedIndices={filteredIndices.unnamed}
          links2={filteredLinks}
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
