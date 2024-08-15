import React from "react";
import { styles } from "../../../styles";
import { useModalContext } from "../../../context";
import useNameFolder from "../../../hooks/useNameFolder";
import { ModalContextType } from "../../../types";

const NameFolder = () => {
  const { folderInputs, modalText } = useModalContext() as ModalContextType;
  const { handleChange, handleClick, error } = useNameFolder();
  const isDisabled: boolean | undefined =
    folderInputs === null ? undefined : !folderInputs.folder_name;
  const isError: boolean | undefined = error ? true : undefined;
  return (
    <div className="w-full">
      <h1 className={`mb-2 ${styles.label}`}>Folder Name</h1>
      <input
        type="text"
        className={`${styles.input} w-full`}
        name="folder_name"
        value={folderInputs?.folder_name ?? ""}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 text-xs ">{error}</p>}
      <div className="w-full flex justify-end mt-2">
        <button
          className={
            folderInputs && folderInputs.folder_name && !error
              ? styles.button1
              : styles.button1Disabled
          }
          onClick={handleClick}
          disabled={isDisabled || isError}
        >
          {modalText.includes("Rename Folder") ? "Done" : "Next: Add Links +"}
        </button>
      </div>
    </div>
  );
};

export default NameFolder;
