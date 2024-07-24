import React from "react";

import LinkList from "./LinkList";

const DisplayedLinks = ({ display, isSearchResults, isExistingLinks }) => {
  
  return (
    <>
      <LinkList
        display={display}
        isSearchResults={isSearchResults}
        isExistingLinks={isExistingLinks}
      />
      {!display.length && isExistingLinks && (
        <p className="flex justify-center text-[11px]  text-dimWhite">
          Nothing here😐
        </p>
      )}
    </>
  );
};

export default DisplayedLinks;
