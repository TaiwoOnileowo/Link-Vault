import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelectOptions } from "../hooks";
const SelectOptions = ({ display }) => {
  const selected = display.filter((display) => display.selected);
  const { handleDelete, handleCopy, handleClickSelectAll, handleCancelSelect } =
    useSelectOptions();
  return (
    <div className="flex justify-between w-full mt-2 text-sm dark:text-white">
      <p>{selected.length} selected</p>
      <div className="flex gap-4">
        <button onClick={handleCopy}>
          <FaRegCopy size={18} />
        </button>
        <button onClick={handleDelete}>
          <RiDeleteBin6Line size={18} />
        </button>
        <button onClick={handleClickSelectAll}>
          {selected.length === display.length ? "Unselect all" : "Select all"}
        </button>
        <button
          onClick={handleCancelSelect}
          className="border border-white px-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SelectOptions;
