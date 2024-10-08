import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import ToggleModes from "./ToggleModes";
import { LuHome, LuFolders } from "react-icons/lu";
import {
  useAppContext,
  useLinkContext,
  useModalContext,
  useThemeContext,
} from "../../../context";
import { Link } from "react-chrome-extension-router";
import Home from "../../Home";
import Folder from "../../Folder";
import { useFolderContext } from "../../../context";
import { IoSettingsOutline } from "react-icons/io5";
import Settings from "../../Settings";
import React from "react";
import {
  AppContextType,
  FolderContextType,
  LinkContextProps,
  ModalContextType,
  ThemeContextType,
} from "../../../types";
import { useNav } from "../../../hooks";
const Nav = () => {
  const { setOpenFolderIndex } = useFolderContext() as FolderContextType;
  const nav = [
    { title: "Home", icon: <LuHome />, component: Home, route: "Home" },
    {
      title: "Folders",
      icon: <LuFolders />,
      component: Folder,
      route: "Folder",
    },
    // { title: "Sessions", icon: <CgBrowser />, route: "sessions" },
    {
      title: "Settings",
      icon: <IoSettingsOutline />,
      component: Settings,
      route: "settings",
    },
    // { title: "Premium", icon: <LuCrown />, route: "premium" },
  ];

  const { setMenu, active, setActive, setRoute } =
    useAppContext() as AppContextType;
  const { darkMode } = useThemeContext() as ThemeContextType;
  const { navRef, toggle, setToggle } = useNav();
  const {
    handleSelectClick,
    setShowCheckboxes,
    setIsFolderLinks,
    setIsFolder,
  } = useLinkContext() as LinkContextProps;
  const handleClick = (item) => {
    handleSelectClick(true);
    setShowCheckboxes(false);
    setActive(item.title);
    setToggle(false);
    setRoute(item.route);
    setOpenFolderIndex(null);
    setIsFolderLinks(false);
    setIsFolder(false);
  };

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
            <Link
              component={item.component}
              key={index}
              className={`inline-flex items-center gap-2 font-medium cursor-pointer text-[16px] ${
                active === item.title
                  ? "text-white"
                  : "text-lightGray dark:text-dimWhite"
              } mb-4`}
              onClick={() => {
                item.title === "Home" && setMenu("Unnamed");
                handleClick(item);
              }}
            >
              <span
                className={`  text-lg ${
                  active === item.title
                    ? "text-white dark:text-primary"
                    : "text-lightGray dark:text-primary"
                }`}
              >
                {item.icon}
              </span>
              {item.title}
            </Link>
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
