
import { useNewFolder } from "../../hooks";
import React from "react";
const NewFolder = () => {
  const { createFolder } = useNewFolder();
  return (
    <div className="w-full">
      <button
        className="rounded-md text-white bg-gradient-1 hover:bg-gradient-3 transition-background ease-in-out duration-300 px-4 py-2 w-full"
        onClick={createFolder}
      >
        Add New Folder +
      </button>
    </div>
  );
};

export default NewFolder;
