import React, { useState } from "react";
import { styles } from "../../styles";
import { useAppContext } from "../../../Context/AppContext";

const Name = () => {
  const { setMenu, folderInputs, setFolderInputs} = useAppContext();
  

  const handleChange = (e) => {
    setFolderInputs({ ...folderInputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full mt-">
      <h1 className={`mb-2 ${styles.label}`}>Folder Name</h1>
      <input
        type="text"
        className={`${styles.input} w-full`}
        name="folder_name"
        value={folderInputs.folder_name}
        onChange={handleChange}
      />
      <div className="w-full flex justify-end mt-2">
        <button
          className={styles.button1}
          onClick={() => folderInputs.folder_name && setMenu("Add Links")}
        >
          Next {">"}
        </button>
      </div>
    </div>
  );
};

export default Name;
