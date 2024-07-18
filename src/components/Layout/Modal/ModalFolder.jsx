import React from "react";
import Menu from "../../Home/Menu";
import AddFolder from "../../Folder/AddFolder/AddFolder";

const ModalFolder = () => {
  return (
    <div className="mt-6">
      <Menu text="Name, Add Links, Links Added" />
      <AddFolder />
    </div>
  );
};

export default ModalFolder;
