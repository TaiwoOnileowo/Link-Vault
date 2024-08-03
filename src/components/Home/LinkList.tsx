import { useAppContext } from "../../context";
import LinkListItem from "./LinkListItem";
import propTypes from "prop-types";
const LinkList = ({
  display,
  isExistingLinks,
  isSearchResults,
  isFolderLinks,
}: {
  display: Array<any>;
  isExistingLinks?: boolean;
  isSearchResults?: boolean;
  isFolderLinks?: boolean;
}) => {
  const { links } = useAppContext();

  return (
    <ul className="list-disc dark:text-white mb-4 text-black list-inside pt-2 h-full">
      {display?.map((link, index) => {
        const originalIndex =
          isExistingLinks || isFolderLinks ? index : links.indexOf(link);
        return (
          <LinkListItem
            index={originalIndex}
            link={link}
            key={index}
            isExistingLinks={isExistingLinks}
            isSearchResults={isSearchResults}
            isFolderLinks={isFolderLinks}
          />
        );
      })}
    </ul>
  );
};

export default LinkList;
