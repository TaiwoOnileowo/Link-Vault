import React from "react";
import { useModalContext } from "../../../../context";
import LinkAddedItem from "./LinkAddedItem";
import { ModalContextType } from "../../../../types";
const LinkAddedList = () => {
  const { folderInputs } = useModalContext() as ModalContextType;
  return (
    <ul>
      {folderInputs &&
        folderInputs.links.map((link, i) => (
          <LinkAddedItem link={link} index={i} key={i} />
        ))}
    </ul>
  );
};

export default LinkAddedList;
