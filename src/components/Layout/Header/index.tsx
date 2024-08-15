import React from "react";
import icon from "/icon.png";
import { useAppContext } from "../../../context";
import { IoSearch } from "react-icons/io5";

import Nav from "./Nav";
import { AppContextType } from "../../../types";
const Header = () => {
  const { handleSearchInputChange, searchInput, route } =
    useAppContext() as AppContextType;

  const folderRoute = route === "Folder";
  return (
    <header
      className={`w-full py-4 flex items-center px-3 justify-between dark:bg-dark bg-lightGray dark:text-white  `}
    >
      <div className="flex items-center gap-4 h-full w-[90%]">
        <div className="flex items-center">
          <img src={icon} className="w-6 object-contain h-6" alt="Link Vault" />
        </div>
        <div
          className={`relative w-full flex text-black items-center justify-center bg-white hover:bg-hoverInputBg rounded-md dark:bg-d-darkGray dark:hover:bg-darkGray px-2`}
        >
          <IoSearch
            className="cursor-pointer text-black dark:text-white font-bold"
            title={`${
              folderRoute ? "Search Folder Links" : " Search Links..."
            }`}
          />
          <input
            type="search"
            className={`p-4 py-2 outline-none text-darkGray dark:text-white text-sm  rounded-md bg-transparent w-full h-[30px]`}
            onChange={handleSearchInputChange}
            placeholder={`${
              folderRoute ? "Search Folder Links" : " Search Links..."
            }`}
            value={searchInput}
          />
        </div>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
