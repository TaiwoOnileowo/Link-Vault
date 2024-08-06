import React from "react";
import LinkList from "./LinkList";

const DisplayedLinks = ({
  display,
  isSearchResults,
  isExistingLinks,
  isFolderLinks,
}: {
  display: Array<any>;
  isSearchResults?: boolean;
  isExistingLinks?: boolean;
  isFolderLinks?: boolean;
}) => {
  return (
    <>
      <LinkList
        display={display}
        isSearchResults={isSearchResults}
        isExistingLinks={isExistingLinks}
        isFolderLinks={isFolderLinks}
      />
      {!display.length && isExistingLinks && (
        <p className="flex justify-center text-[11px]  dark:text-dimWhite">
          Nothing here😐
        </p>
      )}
    </>
  );
};

export default DisplayedLinks;
