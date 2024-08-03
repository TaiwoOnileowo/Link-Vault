import { useLinkContext } from "../../context";
import { useAppContext } from "../../context";

import { GoDotFill } from "react-icons/go";
import Checkbox from "../Checkbox";
import Link from "./Link";
import propTypes from "prop-types";

const LinkListItem = ({
  link,
  index,
  isSearchResults,
  isExistingLinks,
  isFolderLinks,
}: {
  link: object;
  index: number;
  isSearchResults?: boolean;
  isExistingLinks?: boolean;
  isFolderLinks?: boolean;
}) => {
  const { setIsFolder, isFolder, setIsFolderLinks, showCheckboxes } =
    useLinkContext();

  const { handleContextMenu } = useAppContext();
  console.log(isFolder);
  return (
    <li
      key={index}
      className={`${
        isSearchResults ? "fade-up" : null
      } flex items-center gap-[2px] `}
      onContextMenu={(e) => {
        if (isFolderLinks) {
          setIsFolderLinks(true);
          setIsFolder(false);
        }
        handleContextMenu(e, index);
      }}
    >
      {showCheckboxes ? (
        <Checkbox link={link} originalIndex={index} />
      ) : (
        <GoDotFill className="dark:text-white text-black text-xs mt-2" />
      )}

      <Link isExistingLinks={isExistingLinks} link={link} index={index} />
    </li>
  );
};

export default LinkListItem;
