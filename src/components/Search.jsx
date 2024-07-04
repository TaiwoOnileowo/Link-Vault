import React from "react";
import icon from "../assets/icon.png";
import { styles } from "../style";
import { IoSearch } from "react-icons/io5";
import { PiBroomBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { useAppContext } from "../Context/AppContext";
const Search = () => {
  const { setShowAdd, handleSearchInputChange, setShowWarning, links } =
    useAppContext();
  return (
    <div className="fade-in flex gap-[10px] px-6 mt-6 items-center">
      <img
        src={icon}
        alt="Link Vault Icon"
        className="w-10 h-10 object-contain"
      />
      <div className=" w-[350px] h-[40px]  rounded-md bg-[#eaf6ff] hover:bg-[#d5ebff] flex pl-[10px] gap-[2px] items-center">
        <IoSearch className=" cursor-pointer" size={20} title="Search Links" />
        <input
          type="search"
          className={` bg-[#eaf6ff] h-[40px] w-[310px] hover:bg-[#d5ebff] p-4 outline-none rounded-md text-[18px]`}
          onChange={handleSearchInputChange}
          placeholder="Search Links..."
        />
      </div>
      <div className="flex gap-2 ">
        <button
          className={`${styles.button1} text-[18px]`}
          onClick={() => setShowAdd(true)}
          title="Add A New Link"
        >
          <FaPlus />
        </button>
        <button
          className={`${styles.button2} `}
          onClick={() => {
            if (links.length) {
              setShowWarning(true);
            }
          }}
          title="Double Click To Clear All Links"
        >
          <PiBroomBold />
        </button>
      </div>
    </div>
  );
};

export default Search;
