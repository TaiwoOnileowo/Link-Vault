import React from "react";
import icon from "../assets/icon.png";
const Header = () => {
  return (
    <header className="w-full bg-[#12073d] py-8 flex items-center justify-center">
      <div className="flex items-center gap-2 align">
        <img
          src={icon}
          className="w-10 object-contain h-10 align"
          alt="Link Vault"
        />
        <h1 className="text-[30px] text-white font-bold">LINK VAULT</h1>
      </div>
    </header>
  );
};

export default Header;
