import React from "react";
import Name from "./Name";
import { useAppContext } from "../../../Context/AppContext";
import AddLinks from "./AddLinks";
import LinksAdded from "./LinksAdded";
const AddFolder = () => {
  const { menu } = useAppContext();
  return (
    <div className="mt-4">
      {menu === "Name" && <Name />}
      {menu === "Add Links" && <AddLinks />}
      {menu === "Links Added" && <LinksAdded />}
    </div>
  );
};

export default AddFolder;
