
import Menu from "../../Menu";
import AddNewFolder from "../../Folder/AddNewFolder";
import React from "react";
const ModalFolder = () => {
  return (
    <div className="mt-4 scrollbar  max-h-[300px]">
      <Menu text="Name, Add Links, View Links" />
      <AddNewFolder />
    </div>
  );
};

export default ModalFolder;
