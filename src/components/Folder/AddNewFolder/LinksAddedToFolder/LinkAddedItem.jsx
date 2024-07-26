import propTypes from "prop-types";
import { GoDotFill } from "react-icons/go";
import {
  getFormattedLink,
  getFormattedName,
} from "../../../../utils/stringFormatters";
import { MdOutlineCancel } from "react-icons/md";
import useLinksAddedToFolder from "../../../../hooks/useLinksAddedToFolder";
const LinkAddedItem = ({ link, index }) => {
  LinkAddedItem.propTypes = {
    link: propTypes.object.isRequired,
    index: propTypes.number.isRequired,
  };
  const { deleteLink } = useLinksAddedToFolder();
  return (
    <li
      className="text-black dark:text-white w-full flex justify-between gap-4 mb-2 items-center text-xs"
      key={index}
    >
      <div className="flex items-center">
        <span>
          <GoDotFill className="dark:text-white text-black text-[12px]" />
        </span>
        {link.url_name
          ? getFormattedName(link.url_name)
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
