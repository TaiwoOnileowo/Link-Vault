import React from "react";
import { useAppContext } from "../../../../context";
import { styles } from "../../../../styles";
import LinkAddedList from "./LinkAddedList";
import useLinksAddedToFolder from "../../../../hooks/useLinksAddedToFolder";
import ProceedToAddLinks from "./ProceedToAddLinks";
import { AppContextType } from "../../../../types";
const LinksAddedToFolder = () => {
  const { folderInputs, modalText } = useAppContext() as AppContextType;

  const { handleClick } = useLinksAddedToFolder();
  return (
    <div>
      {folderInputs.links.length ? (
        <LinkAddedList />
      ) : (
        <ProceedToAddLinks showModal={false} />
      )}
      <div className="w-full flex justify-end mt-4">
        <button className={styles.button1} onClick={handleClick}>
          {modalText.includes("Save Links To Folder")
            ? "Done"
            : folderInputs.links.length
            ? "Create Folder"
            : "Create Empty Folder"}
        </button>
      </div>
    </div>
  );
};

export default LinksAddedToFolder;
