import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import ToggleModes from "./ToggleModes";
import { LuHome, LuFolders, LuCrown } from "react-icons/lu";
import { CgBrowser } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { useAppContext } from "../../../context/AppContext";

const Nav = () => {
  const nav = [
    { title: "Home", icon: <LuHome />, route: "home" },
    { title: "Folders", icon: <LuFolders />, route: "folders" },
    { title: "Sessions", icon: <CgBrowser />, route: "sessions" },
    { title: "Settings", icon: <IoSettingsOutline />, route: "settings" },
    { title: "Premium", icon: <LuCrown />, route: "premium" },
  ];

  const {
    handleSetRoutes,
    toggle,
    setToggle,
    navRef,
    setMenu,
    active,
    setActive,
    darkMode,
  } = useAppContext();

  const handleClick = (item) => {
    setActive(item.title);
    handleSetRoutes(item.route);
    setToggle(false);
  };
  console.log(toggle);
  return (
    <div className="flex flex-1 justify-end items-center" ref={navRef}>
      <span
        className="text-xl text-dark dark:text-white cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setToggle(!toggle);
        }}
      >
        {toggle ? <AiOutlineClose /> : <HiMenuAlt3 />}
      </span>
      <div
        className={`${!toggle ? "hidden" : "flex"} p-6 ${
          darkMode ? "dark" : ""
        } nav-bg absolute top-20 z-[50] right-0 mx-4 my-2 w-[140px] rounded-xl sidebar`}
      >
        <ul className="list-none flex justify-end items-start flex-1 flex-col">
          {nav.map((item, index) => (
            <li
              key={index}
              className={`inline-flex items-center gap-2 font-medium cursor-pointer text-[16px] ${
                active === item.title
                  ? "text-black dark:text-white"
                  : "text-gray-600 dark:text-dimWhite"
              } ${index === nav.length - 1 ? "mb-0" : "mb-4"}`}
              onClick={() => {
                item.title === "Home" && setMenu("Unnamed");
                handleClick(item);
              }}
            >
              <span className="text-[#122ca3] dark:text-primary text-lg">
                {item.icon}
              </span>
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
