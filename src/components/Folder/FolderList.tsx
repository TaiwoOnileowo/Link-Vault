import React from "react"
import FolderListItem from "./FolderListItem";
import { useAppContext } from "../../context";

const FolderList = ({ isModal }: { isModal?: boolean }) => {
  const { folders } = useAppContext();
  return (
    <ul className="flex flex-col gap-2">
      {folders.map((folder, i) => (
        <FolderListItem folder={folder} index={i} key={i} isModal={isModal} />
      ))}
    </ul>
  );
};

export default FolderList;
