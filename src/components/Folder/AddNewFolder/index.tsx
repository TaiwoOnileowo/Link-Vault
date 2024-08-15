import React from "react";
import NameFolder from "./NameFolder";
import { useAppContext } from "../../../context";
import AddLinksToFolder from "./AddLinksToFolder";
import LinksAddedToFolder from "./LinksAddedToFolder";
import { AppContextType } from "../../../types";
const AddNewFolder = () => {
  const { menu } = useAppContext() as AppContextType;
  
  return (
    <div className="mt-4">
      {menu === "Name" && <NameFolder />}
      {menu === "Add Links" && <AddLinksToFolder />}
      {menu === "View Links" && <LinksAddedToFolder />}
    </div>
  );
};

export default AddNewFolder;
