import React, { useState } from "react";
import NewFolder from "./NewFolder";
import DisplayedFolders from "./DisplayedFolders";

const Folder = () => {
  
  const [openFolder, setOpenFolder] = useState(false);
  return (
    <div className="mb-32 p-2">
      <NewFolder />
      <DisplayedFolders openFolder={openFolder} setOpenFolder={setOpenFolder} />
    </div>
  );
};

export default Folder;
