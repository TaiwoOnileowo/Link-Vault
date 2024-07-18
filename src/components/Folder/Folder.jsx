import React from "react";
import NewFolder from "./NewFolder";
import DisplayedFolders from "./DisplayedFolders";
import Display from "../Layout/Display";
import { useAppContext } from "../../Context/AppContext";
const Folder = () => {
  const { folders } = useAppContext();
 
  return (
    <div className="mb-32 p-2">
      <NewFolder />
      <Display display={folders}>
        <DisplayedFolders />
      </Display>
    </div>
  );
};

export default Folder;
