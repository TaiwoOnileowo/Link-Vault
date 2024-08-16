import React from "react";
import { useModalContext } from "../../../../context";
import { styles } from "../../../../styles";
import LinkAddedList from "./LinkAddedList";
import useLinksAddedToFolder from "../../../../hooks/useLinksAddedToFolder";
import ProceedToAddLinks from "./ProceedToAddLinks";
import { ModalContextType } from "../../../../types";
import Button from "../../../Button";
const LinksAddedToFolder = () => {
  const { folderInputs,  clickedIndex } =
    useModalContext() as ModalContextType;
  const modalIsMounted = clickedIndex > -1;
  const { handleClick } = useLinksAddedToFolder();
  return (
    <div>
      {folderInputs && folderInputs.links.length ? (
        <LinkAddedList />
      ) : (
        <ProceedToAddLinks showModal={false} />
      )}
      <div className="w-full flex justify-end mt-4">
        <Button
          title={
            modalIsMounted
              ? "Done"
              : folderInputs && folderInputs.links.length
              ? "Create Folder"
              : "Create Empty Folder"
          }
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default LinksAddedToFolder;
