import { useAppContext } from "../../context";
import { useFolderContext } from "../../context";
import LinkListItem from "./LinkListItem";
import propTypes from "prop-types";
const LinkList = ({ display, isExistingLinks, isSearchResults }) => {
  LinkList.propTypes = {
    display: propTypes.array.isRequired,
    isExistingLinks: propTypes.bool,
    isSearchResults: propTypes.bool,
  };
  const { links } = useAppContext();
  const { openFolder } = useFolderContext();

  return (
    <ul className="list-disc dark:text-white mb-4 text-black list-inside pt-2 h-full">
      {display?.map((link, index) => {
        const originalIndex =
          openFolder || isExistingLinks ? index : links.indexOf(link);
        console.log(originalIndex);
        console.log(index);
        console.log(openFolder);
        console.log(isExistingLinks);
        return <LinkListItem index={originalIndex} link={link} key={index} isExistingLinks={isExistingLinks} isSearchResults={isSearchResults} />;
      })}
    </ul>
  );
};

export default LinkList;
