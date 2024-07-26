
import DisplayedLinks from "../Home/DisplayedLinks";
import { useLinkContext } from "../../context";
import { useAppContext } from "../../context";
import { useFolderContext } from "../../context";
import SelectOptions from "../SelectOptions";
import ProceedToAddLinks from "./AddNewFolder/LinksAddedToFolder/ProceedToAddLinks";
import propTypes from "prop-types";
const FolderListItemLinks = ({ folder }) => {
  FolderListItemLinks.propTypes = {
    folder: propTypes.object
  };
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
