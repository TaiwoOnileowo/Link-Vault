import { useState, createContext } from "react";
import PropTypes from "prop-types";

// Create the context
export const FolderContext = createContext();

// Context Provider component
export const FolderProvider = ({ children }) => {
  // Component logic here

  FolderProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  // State variables
  const [showFolderCheckboxes, setShowFolderCheckboxes] = useState(false);
  const [index, setIndex] = useState(null);
  const [openFolder, setOpenFolder] = useState(false);

  // Return the context provider
  return (
    <FolderContext.Provider
      value={{
        showFolderCheckboxes,
        setShowFolderCheckboxes,
        index,
        setIndex,
        openFolder,
        setOpenFolder,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};
