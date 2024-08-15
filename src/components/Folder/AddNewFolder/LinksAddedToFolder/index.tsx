import React from "react";
import { useModalContext } from "../../../../context";
import { styles } from "../../../../styles";
import LinkAddedList from "./LinkAddedList";
import useLinksAddedToFolder from "../../../../hooks/useLinksAddedToFolder";
import ProceedToAddLinks from "./ProceedToAddLinks";
import { ModalContextType } from "../../../../types";
const LinksAddedToFolder = () => {
  const { folderInputs, modalText } = useModalContext() as ModalContextType;

  const { handleClick } = useLinksAddedToFolder();
  return (
    <div>
      {folderInputs && folderInputs.links.length ? (
        <LinkAddedList />
      ) : (
        <ProceedToAddLinks showModal={false} />
      )}
      <div className="w-full flex justify-end mt-4">
        <button className={styles.button1} onClick={handleClick}>
          {modalText.includes("Save Links To Folder")
            ? "Done"
            : folderInputs && folderInputs.links.length
            ? "Create Folder"
            : "Create Empty Folder"}
        </button>
      </div>
    </div>
  );
};

export default LinksAddedToFolder;
