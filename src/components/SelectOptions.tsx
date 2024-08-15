import { FaRegCopy } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelectOptions } from "../hooks";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { useAppContext } from "../context";
import React from "react";
import { Links , Folders, AppContextType} from "../types";
const SelectOptions = ({ display }:{
  display: Links[] | Folders[];
}) => {
 
  const selected = display.filter((display) => display.selected);
  const {
    handleDelete,
    handleCopy,
    handleClickSelectAll,
    handleCancelSelect,
    handleShowAddFolder,
    activeItems,
  } = useSelectOptions();
  const { route } = useAppContext() as AppContextType;
  let selectCondition;
  if (route === "Home") {
    selectCondition = selected.length === activeItems.length;
  } else {
    selectCondition = selected.length === display.length;
  }
  return (
    <div className="flex justify-between w-full mt-2 text-xs text-black dark:text-white">
      <p>{selected.length} selected</p>
      <div className="flex gap-3">
        {selected.length > 0 && route === "Home" && (
          <button onClick={() => handleShowAddFolder(null)}>
            <HiOutlineFolderAdd size={16} title="Add to folder" />
          </button>
        )}
        <button onClick={() => handleCopy()}>
          <FaRegCopy size={16} />
        </button>
        <button onClick={() => handleDelete(false)}>
          <RiDeleteBin6Line size={16} />
        </button>
        <button onClick={() => handleClickSelectAll()}>
          {selectCondition ? "Unselect all" : "Select all"}
        </button>
        <button
          onClick={() => handleCancelSelect()}
          className="border border-darkGray  dark:border-white px-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SelectOptions;
