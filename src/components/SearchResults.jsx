import React, { useState, useEffect } from "react";
import { FaBeerMugEmpty } from "react-icons/fa6";
import { useAppContext } from "../context/AppContext";
import DisplayedLinks from "./Home/DisplayedLinks";
import Display from "./Layout/Display";

const SearchResults = () => {
  const { links, searchInput, folders } = useAppContext();
  const [filteredLinks, setFilteredLinks] = useState([]);
  const lowerCaseSearchInput = searchInput.toLowerCase();

  useEffect(() => {
    const newFilteredLinks = links.filter((link) => {
      const linkText = link.url_name || link.url;
      return linkText.toLowerCase().includes(lowerCaseSearchInput);
    });
    const folderLinks = folders.flatMap((folder) => folder.links);

    const filteredFolderLinks = folderLinks.filter((link) =>
      link.url.toLowerCase().includes(lowerCaseSearchInput)
    );
    const searchResults = [...newFilteredLinks, ...filteredFolderLinks];
    setFilteredLinks(searchResults);
  }, [searchInput, links]);

  return (
    <div className="p-2">
      {/* {filteredLinks.length > 0 ? ( */}
        <>
          <h1 className="text-dimWhite text-xs">
            Found ({filteredLinks.length})
          </h1>
          <Display display={filteredLinks} isSearchResults={true}>
            <DisplayedLinks display={filteredLinks} isSearchResults={true}/>
          </Display>
        </>
      {/* // ) : (
      //   <div className=" items-center gap-4 flex flex-col justify-center py-4 mt-4 shadow-xl">
      //     <FaBeerMugEmpty className="w-24 h-24 text-[#d5ebff]" />
      //     <h2 className="text-white text-[28px] font-semibold pb-4">
      //       Nothing Found😐...
      //     </h2>
      //   </div>
      // )} */}
    </div>
  );
};

export default SearchResults;
