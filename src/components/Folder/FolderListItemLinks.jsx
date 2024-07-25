import React from "react";
import DisplayedLinks from "../Home/DisplayedLinks";
import { useLinkContext } from "../../context/LinkContext";
import { useAppContext } from "../../context/AppContext";
import { useFolderContext } from "../../context/FolderContext";
import SelectOptions from "../SelectOptions";
import ProceedToAddLinks from "./AddNewFolder/LinksAddedToFolder/ProceedToAddLinks";
const FolderListItemLinks = ({ folder }) => {
  const { showCheckboxes } = useLinkContext();
  const { openFolder, index: folderIndex } = useFolderContext();
  const { modalText, folders } = useAppContext();

  return (
    <>
      {folder.links?.length > 0 ? (
        <div
          className="text-sm -mt-2"
          onContextMenu={(e) => e.preventDefault()}
        >
          {showCheckboxes && !modalText.includes("Folder") && (
            <div className="mt-1">
              <SelectOptions
                display={openFolder ? folders[folderIndex].links : folders}
              />
            </div>
          )}
          <DisplayedLinks display={folder.links} />
        </div>
      ) : (
        <ProceedToAddLinks showModal={true} />
      )}
    </>
  );
};

export default FolderListItemLinks;
