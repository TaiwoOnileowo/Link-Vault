import { useAppContext, useModalContext } from "../context";
import { useLinkContext } from "../context";
import React from "react";
import { AppContextType, LinkContextProps, ModalContextType } from "../types";
const Menu = ({ text }: { text: string }) => {
  const { menu, setMenu, route } = useAppContext() as AppContextType;
  const { setShowCheckboxes } = useLinkContext() as LinkContextProps;
  const { folderInputs } = useModalContext() as ModalContextType;
  const menuText = text?.split(", ");
  const isFolder = route === "Folder";
  console.log(folderInputs.folder_name);
  const inputError = folderInputs.folder_name === "";
  return (
    <div className="">
      <div className="flex gap-4">
        {menuText.map((item, i) => (
          <menu
            key={i}
            onClick={() => {
              !inputError && setMenu(item);
              menuText.includes("Unnamed") && setShowCheckboxes(false);
            }}
            className="cursor-pointer"
          >
            <h2
              className={`text-base font-semibold ${
                item === menu
                  ? "text-primary-2 dark:text-[#65a4eb]"
                  : "text-mediumGray dark:text-white dark:opacity-70"
              }  ${
                !folderInputs.folder_name && isFolder
                  ? "cursor-not-allowed"
                  : null
              } ${inputError && isFolder ? "cursor-not-allowed" : null}
              `}
            >
              {item}
            </h2>
            <hr
              className={`border-[2px] rounded-sm border-primary-2  dark:border-[#2aa4eb] mt-2 ${
                item === menu ? "block" : "hidden"
              } `}
            />
          </menu>
        ))}
      </div>
      <hr className="border border-mediumGray dark:border-[#808080] opacity-50 -mt-[1.5px]" />
    </div>
  );
};

export default Menu;
