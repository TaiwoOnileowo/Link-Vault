
import { useAppContext } from "../../../../context";
import LinkAddedItem from "./LinkAddedItem";
const LinkAddedList = () => {
  const { folderInputs } = useAppContext();
  return (
    <ul>
      {folderInputs.links.map((link, i) => (
        <LinkAddedItem link={link} index={i} key={i} />
      ))}
    </ul>
  );
};

export default LinkAddedList;
