import React, { useState, createContext } from "react";
import { FolderContextType } from "../types";

export const FolderContext = createContext<FolderContextType | undefined>(
  undefined
);

export const FolderProvider = ({ children }) => {
  const [showFolderCheckboxes, setShowFolderCheckboxes] = useState(false);
  const [openFolderIndex, setOpenFolderIndex] = useState<number | null>(null);

  const toggleFolder = (index: number) => {
    setOpenFolderIndex((prevIndex) => {
      console.log(prevIndex, index);
      if (prevIndex === index) {
        return null;
      }
      return index;
    });
  };
  console.log(openFolderIndex, "daxfrrrrrrrrrrrrrrrrrrrrrrrr");
  return (
    <FolderContext.Provider
      value={{
        showFolderCheckboxes,
        setShowFolderCheckboxes,
        openFolderIndex,
        toggleFolder,
        setOpenFolderIndex,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};
