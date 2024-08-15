
import NewFolder from "./NewFolder";
import DisplayedFolders from "./DisplayedFolders";
import React from "react";
const Folder = () => {
  return (
    <div className="mb-32 p-2">
      <NewFolder />
      <DisplayedFolders />
    </div>
  );
};

export default Folder;
