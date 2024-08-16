import React from "react";
import { styles } from "../../../styles";
import { useModalContext } from "../../../context";
import useNameFolder from "../../../hooks/useNameFolder";
import { ModalContextType } from "../../../types";

import Button from "../../Button";
const NameFolder = () => {
  const { folderInputs, modalText } = useModalContext() as ModalContextType;
  const { handleChange, handleClick, error } = useNameFolder();
  const isDisabled: boolean | undefined =
    folderInputs === null ? undefined : !folderInputs.folder_name;
  const isError: boolean | undefined = error ? true : undefined;
  return (
    <form className="w-full" onSubmit={(e) => handleClick(e)}>
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
        <Button
          className={
            folderInputs && folderInputs.folder_name && !error
              ? styles.button1
              : styles.button1Disabled
          }
          type="submit"
          disabled={isDisabled || isError}
          title={
            modalText.includes("Rename Folder") ? "Done" : "Next: Add Links +"
          }
        />
      </div>
    </form>
  );
};

export default NameFolder;
