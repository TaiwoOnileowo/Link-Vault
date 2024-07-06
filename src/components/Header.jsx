import React from "react";
import icon from "../assets/icon.png";
import { BsMoonStars } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { useAppContext } from "../Context/AppContext";

const Header = () => {
  const { darkMode, setDarkMode } = useAppContext();
  return (
    <header className={`w-full py-4 flex items-center px-8 ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
      <div className="flex items-center gap-2 h-full justify-between w-full">
        <div className="flex text-sm items-center gap-2">
          <img
            src={icon}
            className="w-6 object-contain h-6"
            alt="Link Vault"
          />
          <h1 className=" font-bold">DAX'S VAULT</h1>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? <FiSun /> : <BsMoonStars />}
        </div>
      </div>
    </header>
  );
};

export default Header;
