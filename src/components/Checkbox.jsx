import React from "react";
import { useLinkContext } from "../context/LinkContext";

const Checkbox = ({ link, originalIndex }) => {
  const { handleSelect } = useLinkContext();
  console.log(link)
console.log(!!link.selected)
  return (
    <input
      type="checkbox"
      name="checkbox"
      id="checkbox"
      className="mt-2"
      checked={!!link.selected}
      onChange={() => handleSelect(originalIndex)}
    />
  );
};

export default Checkbox;
