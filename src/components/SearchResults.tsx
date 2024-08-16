import { useState, useEffect } from "react";
import { useAppContext } from "../context";
import DisplayedLinks from "./Home/DisplayedLinks";
import Display from "./Layout/Display";
import React from "react";
import { AppContextType, Links } from "../types";
const SearchResults = () => {
  const { links, searchInput, folders, route } =
    useAppContext() as AppContextType;
  const [filteredLinks, setFilteredLinks] = useState<Links[] | []>([]);
  const lowerCaseSearchInput = searchInput.toLowerCase();
  const folderRoute = route === "Folder";
  useEffect(() => {
    const newFilteredLinks = links.filter((link) => {
      const linkText = link.url_name || link.url;
      return linkText.toLowerCase().includes(lowerCaseSearchInput);
    });
    const folderLinks = folders.flatMap((folder) => folder.links);

    const filteredFolderLinks = folderLinks.filter((link) =>
      link.url.toLowerCase().includes(lowerCaseSearchInput)
    );

    let searchResults: Links[] = [];
    if (folderRoute) {
      searchResults = [...filteredFolderLinks];
    } else {
      searchResults = [...newFilteredLinks];
    }

    setFilteredLinks(searchResults);
  }, [searchInput, links, folderRoute, folders, lowerCaseSearchInput]);
  console.log(filteredLinks);
  console.log(folderRoute);
  console.log(route);
  // todo: check if the cancel for the search result works
  return (
    <div className="p-2">
      <>
        <h1 className="dark:text-dimWhite text-sm">
          Found ({filteredLinks.length})
        </h1>
        <Display display={filteredLinks} isSearchResults={true}>
          <DisplayedLinks display={filteredLinks} isSearchResults={true} />
        </Display>
      </>
    </div>
  );
};

export default SearchResults;
