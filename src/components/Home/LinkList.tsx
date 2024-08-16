import { useAppContext } from "../../context";
import { AppContextType, Links } from "../../types";
import LinkListItem from "./LinkListItem";
import React from "react";
const LinkList = ({
  display,
  isExistingLinks,
  isSearchResults,
  isFolderLinks,
}: {
  display: Links[];
  isExistingLinks?: boolean;
  isSearchResults?: boolean;
  isFolderLinks?: boolean;
}) => {
  const { links } = useAppContext() as AppContextType;

  return (
    <ul className="list-disc dark:text-white mb-4 text-black list-inside pt-2 h-full">
      {display?.map((link, index) => {
        const originalIndex =
          isExistingLinks || isFolderLinks ? index : links.indexOf(link);
        return (
          <LinkListItem
            index={originalIndex}
            link={link}
            key={index}
            isExistingLinks={isExistingLinks}
            isSearchResults={isSearchResults}
            isFolderLinks={isFolderLinks}
          />
        );
      })}
    </ul>
  );
};

export default LinkList;
