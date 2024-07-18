import React from "react";
import { useAppContext } from "../../Context/AppContext";

const NewFolder = () => {
  const { openModal, setMenu,  setFolderInputs } = useAppContext();
  
  return (
    <div className="w-full">
      <button
        className="rounded-md text-white bg-primary px-4 py-2 w-full"
        onClick={() => {
          setMenu("Name");
          openModal("Add New Folder", null);
          setFolderInputs({
            folder_name: "",
            links: [],
          });
        }}
      >
        Add New Folder
      </button>
    </div>
  );
};

export default NewFolder;
