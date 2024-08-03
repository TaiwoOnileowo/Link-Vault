
import NameFolder from "./NameFolder";
import { useAppContext } from "../../../context";
import AddLinksToFolder from "./AddLinksToFolder";
import LinksAddedToFolder from "./LinksAddedToFolder";
const AddNewFolder = () => {
  const { menu } = useAppContext();
  
  return (
    <div className="mt-4">
      {menu === "Name" && <NameFolder />}
      {menu === "Add Links" && <AddLinksToFolder />}
      {menu === "View Links" && <LinksAddedToFolder />}
    </div>
  );
};

export default AddNewFolder;
