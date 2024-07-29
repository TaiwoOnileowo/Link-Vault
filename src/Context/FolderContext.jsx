import { useState, createContext } from "react";
import PropTypes from "prop-types";

// Create the context
export const FolderContext = createContext();

// Context Provider component
export const FolderProvider = ({ children }) => {
  FolderProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [showFolderCheckboxes, setShowFolderCheckboxes] = useState(false);
  const [openFolderIndex, setOpenFolderIndex] = useState(null);

  const toggleFolder = (index) => {
    setOpenFolderIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <FolderContext.Provider
      value={{
        showFolderCheckboxes,
        setShowFolderCheckboxes,
        openFolderIndex,
        toggleFolder,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};
