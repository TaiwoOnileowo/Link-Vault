import React, { useState, useEffect } from "react";
import { FaBeerMugEmpty } from "react-icons/fa6";
import { useAppContext } from "../Context/AppContext";
import DisplayedLinks from "./Home/DisplayedLinks";

const SearchResults = () => {
  const { links, searchInput } = useAppContext();
  const [filteredLinks, setFilteredLinks] = useState([]);
  const lowerCaseSearchInput = searchInput.toLowerCase();

  useEffect(() => {
    const newFilteredLinks = links.filter((link) => {
      const linkText = link.url_name || link.url;
      return linkText.toLowerCase().includes(lowerCaseSearchInput);
    });

    setFilteredLinks(newFilteredLinks);
  }, [searchInput, links]);
console.log("beans")
  return (
    <div className="p-2">
      {filteredLinks.length > 0 ? (
        <>
          <h1 className="text-dimWhite text-xs">Found ({filteredLinks.length})</h1>
          <DisplayedLinks searchResults={filteredLinks} />
        </>
      ) : (
        <div className=" items-center gap-4 flex flex-col justify-center py-4 mt-4 shadow-xl">
          <FaBeerMugEmpty className="w-24 h-24 text-[#d5ebff]" />
          <h2 className="text-white text-28px font-semibold pb-4">
            Nothing Found😐...
          </h2>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
