import { useAppContext } from "../../context";
import { useFolderContext } from "../../context";
import LinkListItem from "./LinkListItem";
import propTypes from "prop-types";
const LinkList = ({ display }) => {
  LinkList.propTypes = {
    display: propTypes.array.isRequired,
  };
  const { links } = useAppContext();
  const { openFolder } = useFolderContext();

  return (
    <ul className="list-disc dark:text-white mb-4 text-black list-inside pt-2 h-full">
      {display?.map((link, index) => {
        const originalIndex = openFolder ? index : links.indexOf(link);
        return <LinkListItem index={originalIndex} link={link} key={index} />;
      })}
    </ul>
  );
};

export default LinkList;
