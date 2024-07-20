import React from "react";
import { useLinkContext } from "../../Context/LinkContext";

const Checkbox = ({ link, originalIndex }) => {
  const { handleSelect, isFolder } = useLinkContext();

  return (
    <input
      type="checkbox"
      name="checkbox"
      id="checkbox"
      className="mt-2"
      checked={!!link.selected}
      onChange={() => handleSelect(originalIndex, isFolder)}
    />
  );
};

export default Checkbox;
