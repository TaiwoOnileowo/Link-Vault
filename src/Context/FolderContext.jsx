import { useState, createContext, useContext } from "react";

// Create the context
const FolderContext = createContext();

// Context Provider component
export const FolderProvider = ({ children }) => {
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

// Custom hook for using the context
export const useFolderContext = () => useContext(FolderContext);
