import { useState, useEffect } from "react";
import { useAppContext } from "../context";
import DisplayedLinks from "./Home/DisplayedLinks";
import Display from "./Layout/Display";

const SearchResults = () => {
  const { links, searchInput, folders , route} = useAppContext();
  const [filteredLinks, setFilteredLinks] = useState([]);
  const lowerCaseSearchInput = searchInput.toLowerCase();
  const folderRoute = route==="Folder";
  useEffect(() => {
    const newFilteredLinks = links.filter((link) => {
      const linkText = link.url_name || link.url;
      return linkText.toLowerCase().includes(lowerCaseSearchInput);
    });
    const folderLinks = folders.flatMap((folder) => folder.links);

    const filteredFolderLinks = folderLinks.filter((link) =>
      link.url.toLowerCase().includes(lowerCaseSearchInput)
    );

    let searchResults = [];
    if (folderRoute) {
      searchResults = [...filteredFolderLinks];
    } else {
      searchResults = [...newFilteredLinks];
    }

    setFilteredLinks(searchResults);
  }, [searchInput, links, folderRoute, folders, lowerCaseSearchInput]);
  console.log(filteredLinks);
  console.log(folderRoute);
  console.log(route)
  return (
    <div className="p-2">
      <>
        <h1 className="text-dimWhite text-xs">
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
