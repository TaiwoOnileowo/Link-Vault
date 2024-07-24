import React from "react";
import Name from "./Name";
import { useAppContext } from "../../../context/AppContext";
import AddLinksToFolder from "./AddLinksToFolder";
import LinksAddedToFolder from "./LinksAddedToFolder";
const AddNewFolder = () => {
  const { menu } = useAppContext();
  
  return (
    <div className="mt-4">
      {menu === "Name" && <Name />}
      {menu === "Add Links" && <AddLinksToFolder />}
      {menu === "Links Added" && <LinksAddedToFolder />}
    </div>
  );
};

export default AddNewFolder;
