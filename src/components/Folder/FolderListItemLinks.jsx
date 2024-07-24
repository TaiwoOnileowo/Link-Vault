import React from "react";
import DisplayedLinks from "../Home/DisplayedLinks";
import { useLinkContext } from "../../context/LinkContext";
import { useAppContext } from "../../context/AppContext";
import { useFolderContext } from "../../context/FolderContext";
import SelectOptions from "../SelectOptions";
const FolderListItemLinks = ({ folder }) => {
  const { showCheckboxes } = useLinkContext();
  const { openFolder, index: folderIndex } = useFolderContext();
  const { modalText, folders, openModal } = useAppContext();

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
        <p className="text-xs my-4">
          Empty folder 🫠{" "}
          <span
            className="underline text-primary cursor-pointer"
            // onClick={() =>
            //   openModal("Edit Folder", details, linkIndex, isFolder)
            // }
          >
            add links
          </span>
        </p>
      )}
    </>
  );
};

export default FolderListItemLinks;
