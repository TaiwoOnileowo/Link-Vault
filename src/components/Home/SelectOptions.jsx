import React from "react";
import { useLinkContext } from "../../Context/LinkContext";
import { useAppContext } from "../../Context/AppContext";
import { FaRegCopy } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
const SelectOptions = ({ display, isFolder }) => {
  const {
    handleBulkCopy,
    handleBulkDelete,
    handleSelectAll,
    handleCancelSelect,
    handleBulkCopyFolder,
    handleBulkDeleteFolder,
    handleSelectAllFolders,
  } = useLinkContext();
  const { menu, links } = useAppContext();
  const selected = display.filter((display) => display.selected);

  return (
    <div className="flex justify-between w-full mt-2 text-sm dark:text-white">
      <p>{selected.length} selected</p>
      <div className="flex gap-4">
        <button onClick={isFolder ? handleBulkCopyFolder : handleBulkCopy}>
          <FaRegCopy size={18} />
        </button>
        <button
          onClick={() =>
            isFolder ? handleBulkDeleteFolder() : handleBulkDelete(menu)
          }
        >
          <RiDeleteBin6Line size={18} />
        </button>
        <button
          onClick={() =>
            isFolder ? handleSelectAllFolders() : handleSelectAll(menu)
          }
        >
          {selected.length === display.length ? "Unselect all" : "Select all"}
        </button>
        <button
          onClick={() => {
            isFolder ? handleCancelSelect(isFolder) : handleCancelSelect();
          }}
          className="border border-white px-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SelectOptions;
