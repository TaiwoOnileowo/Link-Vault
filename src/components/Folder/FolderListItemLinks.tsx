import DisplayedLinks from "../Home/DisplayedLinks";
import { useLinkContext } from "../../context";
import { useAppContext } from "../../context";
import { useFolderContext } from "../../context";
import SelectOptions from "../SelectOptions";
import ProceedToAddLinks from "./AddNewFolder/LinksAddedToFolder/ProceedToAddLinks";
import ContextMenu from "../Layout/ContextMenu";
import LinkPreview from "../LinkPreview";
const FolderListItemLinks = ({ folder }: { folder: object }) => {
  const { showCheckboxes } = useLinkContext();
  const { openFolderIndex, showFolderCheckboxes } = useFolderContext();
  const {
    modalText,
    folders,
    previewLink,
    previewLinkRef,
    contextMenu,
    contextMenuRef,
  } = useAppContext();
  const { linkIndex } = previewLink;

  return (
    <>
      {folder.links?.length > 0 ? (
        <div
          className="text-sm -mt-2"
          onContextMenu={(e) => e.preventDefault()}
        >
          {showCheckboxes && !modalText.includes("Folder") && (
            <div className="mt-1">
              <SelectOptions display={folders[openFolderIndex].links} />
            </div>
          )}{" "}
          {contextMenu.visible && !showFolderCheckboxes && (
            <div ref={contextMenuRef}>
              <ContextMenu items={folders[openFolderIndex].links} />
            </div>
          )}
          <>
            {previewLink.visible && (
              <div ref={previewLinkRef}>
                <LinkPreview url={folder.links[linkIndex].url} />
              </div>
            )}
          </>
          <DisplayedLinks display={folder.links} isFolderLinks={true} />
        </div>
      ) : (
        <ProceedToAddLinks showModal={true} />
      )}
    </>
  );
};

export default FolderListItemLinks;
