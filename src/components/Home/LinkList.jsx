import React from "react";
import { useAppContext } from "../../context/AppContext";
import { useFolderContext } from "../../context/FolderContext";
import LinkListItem from "./LinkListItem";
const LinkList = ({ display }) => {
  const { links } = useAppContext();
  const { openFolder } = useFolderContext();
  
  return (
    <ul className="list-disc dark:text-white mb-4 text-black list-inside pt-2 h-full">
      {display?.map((link, index) => {
        const originalIndex = openFolder ? index : links.indexOf(link);
        return <LinkListItem index={originalIndex} link={link} key={index} />;
      })}
    </ul>
  );
};

export default LinkList;
