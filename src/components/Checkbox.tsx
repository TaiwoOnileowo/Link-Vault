import React from "react";
import { useLinkContext } from "../context";
import { Folders, LinkContextProps, Links } from "../types";

const Checkbox = ({
  link,
  originalIndex,
  isModal,
}: {
  link: Links | Folders;
  originalIndex: number;
  isModal?: boolean;
}) => {
  const { handleSelect, isFolderLinks,  handleSelectLinkInFolder } = useLinkContext() as LinkContextProps;
  console.log(link);
  return (
    <input
      type="checkbox"
      name="checkbox"
      id="checkbox"
      className="mt-2"
      checked={!!link.selected}
      onChange={() => {
        if (isFolderLinks) {
          handleSelectLinkInFolder(originalIndex);
        } else {
          handleSelect(originalIndex, isModal);
        }
      }}
    />
  );
};

export default Checkbox;
