import React, { useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../../Context/AppContext";
import { useLinkContext } from "../../Context/LinkContext";
import { useFolderContext } from "../../Context/FolderContext";
import { GoDotFill } from "react-icons/go";
import { TbPinFilled } from "react-icons/tb";
import Checkbox from "../Home/Checkbox";
const DisplayedFolders = () => {
  const [openFolder, setOpenFolder] = useState(false);
  const [index, setIndex] = useState(null);

  const getFormattedName = (name) =>
    name.length > 38 ? `${name.substr(0, 38)} ...` : name;

  const getFormattedLink = (link) => {
    return link.length > 40 ? link.substr(0, 40) + " ..." : link;
  };

  const { folders, handleContextMenu } = useAppContext();
  const {  showFolderCheckboxes } = useFolderContext();
  const { handleSelect } = useLinkContext();

  return (
    <div className="mt-4 text-white">
      <ul className="flex flex-col gap-2">
        {folders.map((folder, i) => (
          <div key={i} className="select-none flex  flex-col ">
            <div className="flex  gap-2 items-center">
              {showFolderCheckboxes && (
                <Checkbox link={folder} originalIndex={i} />
              )}
              <li
                className="inline-flex items-center gap-2 font-bold text-base "
                onClick={(e) => {
                  if (showFolderCheckboxes) {
                    handleSelect(i, true);
                  } else {
                    setIndex(i);
                    setOpenFolder((prev) => !prev);
                  }
                }}
                onContextMenu={(e) => handleContextMenu(e, i)}
              >
                <span className="flex   items-center bg-black-gradient rounded-md  cursor-pointer  p-1 px-2">
                  <span className="text-xs">
                    {openFolder && index == i ? (
                      <FaCaretDown />
                    ) : (
                      <FaCaretRight />
                    )}
                  </span>
                  {folder.folder_name}
                </span>

                {folder.pinned && (
                  <TbPinFilled className="dark:text-[#4c4c74] text-[#2a4ff6]" />
                )}
              </li>
            </div>
            {openFolder && folder.links.length > 0 && index == i && (
              <div className="text-sm mt-0 py-2">
                {folder.links.map((link, i) => (
                  <p
                    className="text-white flex mb-[2px] gap-1 items-center"
                    key={i}
                  >
                    <span>
                      {" "}
                      <GoDotFill className="dark:text-white text-black text-xs" />
                    </span>
                    {link.url_name
                      ? getFormattedName(link.url_name)
                      : getFormattedLink(link.url)}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DisplayedFolders;
