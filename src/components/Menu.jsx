import React from "react";
import { useAppContext } from "../context/AppContext";
import { useLinkContext } from "../context/LinkContext";

const Menu = ({ text }) => {
  const { menu, setMenu, folderInputs } = useAppContext();
  const { setShowCheckboxes } = useLinkContext();

  const menuText = text?.split(", ");

  return (
    <div className="">
      <div className="flex gap-4">
        {menuText.map((item, i) => (
          <menu
            key={i}
            onClick={() => {
              if (menuText.includes("Add Links")) {
                folderInputs.folder_name && setMenu(item);
              } else {
                setMenu(item);
                menuText.includes("Unnamed") && setShowCheckboxes(false);
              }
            }}
            className="cursor-pointer"
          >
            <h2
              className={`text-base font-semibold ${
                item === menu
                  ? "text-primary dark:text-[#65a4eb]"
                  : `text-black dark:text-white dark:opacity-70  ${
                      menuText.includes("Add Links")
                        ? folderInputs.folder_name
                          ? null
                          : "cursor-not-allowed"
                        : null
                    }`
              }`}
            >
              {item}
            </h2>
            <hr
              className={`border-[2px] rounded-sm border-primary dark:border-[#2aa4eb] mt-2 ${
                item === menu ? "block" : "hidden"
              } `}
            />
          </menu>
        ))}
      </div>
      <hr className="border border-black dark:border-[#808080] opacity-50 -mt-[1.5px]" />
    </div>
  );
};

export default Menu;
