import React from "react";
import { useLinkContext } from "../../Context/LinkContext";
import { useAppContext } from "../../Context/AppContext";
const Checkbox = ({ link, originalIndex }) => {
  const { handleSelect } = useLinkContext();
  const { routes, modalText } = useAppContext();
  const isFolder = routes.folders && !modalText.includes("Folder");

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
