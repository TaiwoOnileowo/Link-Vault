import React from "react";
import { useAppContext } from "../../../../context/AppContext";
import { styles } from "../../../../styles";

import LinkAddedList from "./LinkAddedList";
import useLinksAddedToFolder from "../../../../hooks/useLinksAddedToFolder";
const LinksAddedToFolder = () => {
  const { folderInputs } = useAppContext();

  const { AddLinks, handleClick } = useLinksAddedToFolder();
  return (
    <div>
      {folderInputs.links.length ? (
        <LinkAddedList />
      ) : (
        <h1 className="text-dimWhite font-medium text-sm">
          Empty folder, proceed to{" "}
          <span
            className="underline text-primary cursor-pointer"
            onClick={AddLinks}
          >
            add links
          </span>
        </h1>
      )}
      <div className="w-full flex justify-end mt-4">
        <button className={styles.button1} onClick={handleClick}>
          {folderInputs.links.length ? "Create Folder" : "Create Empty Folder"}
        </button>
      </div>
    </div>
  );
};

export default LinksAddedToFolder;
