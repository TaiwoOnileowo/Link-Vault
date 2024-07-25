import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelectOptions } from "../hooks";
import { HiOutlineFolderAdd } from "react-icons/hi";
const SelectOptions = ({ display }) => {
  const selected = display.filter((display) => display.selected);
  const { handleDelete, handleCopy, handleClickSelectAll, handleCancelSelect, handleShowAddFolder } =
    useSelectOptions();

  return (
    <div className="flex justify-between w-full mt-2 text-xs dark:text-white">
      <p>{selected.length} selected</p>
      <div className="flex gap-2">
        {selected.length > 0 && (
          <button onClick={() => handleShowAddFolder()}>
            <HiOutlineFolderAdd size={16} title="Add to folder" />
          </button>
        )}
        <button onClick={() => handleCopy()}>
          <FaRegCopy size={16}/>
        </button>
        <button onClick={() => handleDelete(false)}>
          <RiDeleteBin6Line size={16} />
        </button>
        <button onClick={() => handleClickSelectAll()}>
          {selected.length === display.length ? "Unselect all" : "Select all"}
        </button>
        <button
          onClick={() => handleCancelSelect()}
          className="border border-white px-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SelectOptions;
