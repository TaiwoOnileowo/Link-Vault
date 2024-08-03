import { FaBeerMugEmpty } from "react-icons/fa6";
import ContextMenu from "./ContextMenu";
import { useAppContext } from "../../context";
import { useLinkContext } from "../../context";
import { useFolderContext } from "../../context";
import SelectOptions from "../SelectOptions";
import LinkPreview from "../LinkPreview";
const Display = ({
  children,
  display,
  isSearchResults,
}: {
  children: React.ReactNode;
  display: Array<any>;
  isSearchResults?: boolean;
}) => {
  const { showCheckboxes } = useLinkContext();
  const { showFolderCheckboxes } = useFolderContext();
  const { contextMenu, contextMenuRef, links, previewLink, previewLinkRef } =
    useAppContext();
  const { linkIndex } = previewLink;

  return (
    <>
      {contextMenu.visible && !showCheckboxes && !showFolderCheckboxes && (
        <div ref={contextMenuRef}>
          <ContextMenu items={links} />
        </div>
      )}
      {previewLink.visible && (
        <div ref={previewLinkRef}>
          <LinkPreview url={links[linkIndex].url} />
        </div>
      )}
      {display.length > 0 ? (
        <>
          {showCheckboxes && <SelectOptions display={links} />}
          {children}
        </>
      ) : (
        <div
          className={`bg-lightGray dark:bg-d-mediumGray flex flex-col items-center justify-center py-4 mt-4 shadow-xl`}
        >
          <FaBeerMugEmpty className="w-24 h-24 dark:text-[#d5ebff] text-[#2a4ff6]" />
          <h2 className="dark:text-white text-darkGray  text-[28px] font-semibold py-4">
            Nothing {isSearchResults ? "Found" : "Here"} 😐...
          </h2>
        </div>
      )}
    </>
  );
};

export default Display;
