import React from "react";
import { GoDotFill } from "react-icons/go";
import { getFormattedLink } from "../../../../utils/stringFormatters";
import { MdOutlineCancel } from "react-icons/md";
import useLinksAddedToFolder from "../../../../hooks/useLinksAddedToFolder";
import { Links } from "../../../../types";
const LinkAddedItem = ({ link, index }: { link: Links; index: number }) => {
  const { deleteLink } = useLinksAddedToFolder();
  return (
    <li
      className="text-black dark:text-white w-full flex justify-between gap-2 mb-2 items-center text-[13px]"
      key={index}
    >
      <div className="flex items-center gap-1">
        <span>
          <GoDotFill className="dark:text-white text-black text-[12px]" />
        </span>
        {link.url_name
          ? getFormattedLink(link.url_name)
          : getFormattedLink(link.url)}
      </div>
      <MdOutlineCancel
        className="text-black dark:text-dimWhite hover:text-white cursor-pointer"
        onClick={() => deleteLink(index)}
      />
    </li>
  );
};

export default LinkAddedItem;
