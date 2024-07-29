import { useLinkContext } from "../../context";
import { useAppContext } from "../../context";
import { useFolderContext } from "../../context";
import { GoDotFill } from "react-icons/go";
import Checkbox from "../Checkbox";
import Link from "./Link";
import propTypes from "prop-types";

const LinkListItem = ({ link, index, isSearchResults, isExistingLinks }) => {
  LinkListItem.propTypes = {
    link: propTypes.object.isRequired,
    index: propTypes.number.isRequired,
    isSearchResults: propTypes.bool,
    isExistingLinks: propTypes.bool,
  };
  const { setIsFolder, setIsFolderLinks, showCheckboxes } = useLinkContext();
  const { openFolder } = useFolderContext();
  const { handleContextMenu } = useAppContext();

  return (
    <li
      key={index}
      className={`${
        isSearchResults ? "fade-up" : null
      } flex items-center gap-[2px] `}
      onContextMenu={(e) => {
        if (openFolder) {
          setIsFolderLinks(true);
          setIsFolder(false);
        }
        handleContextMenu(e, index);
      }}
    >
      {showCheckboxes ? (
        <Checkbox link={link} originalIndex={index} isExistingLinks={isExistingLinks} />
      ) : (
        <GoDotFill className="dark:text-white text-black text-xs mt-2" />
      )}

      <Link isExistingLinks={isExistingLinks} link={link} index={index} />
    </li>
  );
};

export default LinkListItem;
