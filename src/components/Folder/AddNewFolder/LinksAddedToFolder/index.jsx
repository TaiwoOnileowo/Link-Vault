import React from "react";
import { useAppContext } from "../../../../context/AppContext";
import { styles } from "../../../../styles";

import LinkAddedList from "./LinkAddedList";
import useLinksAddedToFolder from "../../../../hooks/useLinksAddedToFolder";
import ProceedToAddLinks from "./ProceedToAddLinks";
const LinksAddedToFolder = () => {
  const { folderInputs, modalText } = useAppContext();

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
          {modalText.includes("Add Links To Folder")
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
