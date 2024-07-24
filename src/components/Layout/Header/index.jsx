import React from "react";
import icon from "/icon.png";
import { useAppContext } from "../../../context/AppContext";
import { IoSearch } from "react-icons/io5";

import Nav from "./Nav";

const Header = () => {
  const { handleSearchInputChange, searchInput } = useAppContext();

  return (
    <header
      className={`w-full py-4 flex items-center px-3 justify-between dark:bg-dark bg-white dark:text-white  `}
    >
      <div className="flex items-center gap-4 h-full w-[90%]">
        <div className="flex items-center">
          <img src={icon} className="w-6 object-contain h-6" alt="Link Vault" />
        </div>
        <div
          className={`relative w-full flex items-center justify-center bg-[#eaf6ff] hover:bg-[#d5ebff] rounded-md dark:bg-darkAlt dark:hover:bg-[#2d2f36] px-2`}
        >
          <IoSearch className="cursor-pointer" title="Search Links" />
          <input
            type="search"
            className={`p-4 py-2 outline-none text-black dark:text-white text-sm bg-[#eaf6ff] rounded-md hover:bg-[#d5ebff] dark:bg-darkAlt dark:hover:bg-[#212227] w-full h-[30px]`}
            onChange={handleSearchInputChange}
            placeholder="Search Links..."
            value={searchInput}
          />
        </div>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
