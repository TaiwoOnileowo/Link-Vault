import React, { useState } from "react";
import { styles } from "../style";
import { IoSearch } from "react-icons/io5";
import { PiBroomBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { useAppContext } from "../Context/AppContext";
import { useInputsContext } from "../Context/InputsContext";

const Search = () => {
  const { handleSearchInputChange, setShowWarning, links } = useAppContext();
  const { setShowAdd, showCustomName } = useInputsContext();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="fade-in flex gap-[10px] px-2 mt-1 items-center">
      {showSearch ? (
        <>
          <div className="w-full h-[40px] rounded-md dark:text-white bg-lightBg dark:bg-darkAlt fade-in hover:bg-lightHoverBg dark:hover:bg-[#2d2f36] flex pl-[10px] gap-[2px] items-center">
            <IoSearch className="cursor-pointer" size={20} title="Search Links" />
            <input
              type="search"
              className={`${styles.input} w-full h-[40px]`}
              onChange={handleSearchInputChange}
              placeholder="Search Links..."
            />
          </div>
          <div
            className={`bg-primary text-white h-[40px] flex items-center justify-center px-1 rounded-md cursor-pointer ${styles.hover}`}
            onClick={() => setShowSearch(false)}
          >
            <IoIosArrowBack size={18} />
          </div>
        </>
      ) : (
        <div className="flex gap-2 fade-in w-full">
          <button
            className={`${styles.button3}`}
            onClick={() => setShowSearch(true)}
            title="Search Links"
          >
            <IoSearch className="cursor-pointer" title="Search Links" size={18} />
          </button>
          <button
            className={`${styles.button1} inline-flex justify-center gap-2 w-[100%] items-center`}
            onClick={() => setShowAdd(true)}
          >
            Add New Link <FaPlus />
          </button>
          <button
            className={`${styles.button3}`}
            onClick={() => {
              if (links.length) {
                setShowWarning(true);
              }
            }}
            title="Double Click to clear all links"
          >
            <PiBroomBold size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
