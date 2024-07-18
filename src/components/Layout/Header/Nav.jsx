import React, { useState } from "react";
import close from "../../../assets/close.svg";
import menu from "../../../assets/menu.svg";
import ToggleModes from "./ToggleModes";
import { LuHome } from "react-icons/lu";
import { LuFolders } from "react-icons/lu";
import { CgBrowser } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";
import { useAppContext } from "../../../Context/AppContext";
const Nav = () => {
  const [active, setActive] = useState("Home");

  const nav = [
    { title: "Home", icon: <LuHome />, route: "home" },
    { title: "Folders", icon: <LuFolders />, route: "folders" },
    { title: "Sessions", icon: <CgBrowser /> },
    { title: "Settings", icon: <IoSettingsOutline /> },
    { title: "Premium", icon: <LuCrown /> },
  ];
  const { handleSetRoutes, toggle, setToggle, navRef, setMenu } =
    useAppContext();
  const handleClick = (item) => {
    setActive(item.title);
    handleSetRoutes(item.route);
    setToggle(false);
  };

  return (
    <div className="flex flex-1 justify-end items-center " ref={navRef}>
      <img
        src={toggle ? close : menu}
        alt="menu"
        className="w-[18px] h-[18px] object-contain cursor-pointer"
        onClick={() => setToggle(!toggle)}
      />

      <div
        className={`${
          !toggle ? "hidden" : "flex"
        } p-6 bg-black-gradient absolute top-20 z-[50] right-0 mx-4 my-2 w-[140px] rounded-xl sidebar`}
      >
        <ul className="list-none flex justify-end items-start flex-1 flex-col">
          {nav.map((item, index) => (
            <li
              key={index}
              className={`inline-flex items-center gap-2 font-medium cursor-pointer text-[16px] ${
                active === item.title ? "text-white" : "text-dimWhite"
              } ${index === item.length - 1 ? "mb-0" : "mb-4"}`}
              onClick={() => {
                item.title === "Home" && setMenu("Unnamed");
                handleClick(item);
              }}
            >
              <span className="text-primary text-lg">{item.icon}</span>
              {item.title}
            </li>
          ))}
          <li>
            <ToggleModes />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
