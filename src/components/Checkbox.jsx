import React from "react";
import { useLinkContext } from "../context/LinkContext";

const Checkbox = ({ link, originalIndex, isModal }) => {
  const { handleSelect } = useLinkContext();
  return (
    <input
      type="checkbox"
      name="checkbox"
      id="checkbox"
      className="mt-2"
      checked={link.selected}
      onChange={() => handleSelect(originalIndex, isModal)}
    />
  );
};


export default Checkbox;
