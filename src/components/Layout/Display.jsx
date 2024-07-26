import { FaBeerMugEmpty } from "react-icons/fa6";
import ContextMenu from "./ContextMenu";
import { useAppContext } from "../../context";
import { useLinkContext } from "../../context";
import { useFolderContext } from "../../context";
import SelectOptions from "../SelectOptions";
import propTypes from "prop-types";
const Display = ({ children, display, isSearchResults }) => {
  Display.propTypes = {
    children: propTypes.node.isRequired,
    display: propTypes.array.isRequired,
    isSearchResults: propTypes.bool,
  };
  const { showCheckboxes } = useLinkContext();
  const { showFolderCheckboxes } = useFolderContext();
  const { contextMenu, contextMenuRef, links } = useAppContext();

  return (
    <>
      {contextMenu.visible && !showCheckboxes && !showFolderCheckboxes && (
        <div ref={contextMenuRef}>
          <ContextMenu items={links} />
        </div>
      )}
      {display.length > 0 ? (
        <>
          {(showCheckboxes || showFolderCheckboxes) && (
            <SelectOptions display={links} />
          )}
          {children}
        </>
      ) : (
        <div
          className={`bg-white dark:bg-darkAlt h-[50%] bg-opacity-50 flex flex-col items-center justify-center py-4 mt-4 shadow-xl`}
        >
          <FaBeerMugEmpty className="w-24 h-24 dark:text-[#d5ebff] text-[#2a4ff6]" />
          <h2 className="dark:text-white text-black text-[28px] font-semibold pb-4">
            Nothing {isSearchResults ? "Found" : "Here"} 😐...
          </h2>
        </div>
      )}
    </>
  );
};

export default Display;
