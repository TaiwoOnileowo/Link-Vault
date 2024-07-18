import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";

const Context = createContext();

export const FolderContext = ({ children }) => {
  ////////////////////////////         STATE ////////////////////////////
  const [showFolderCheckboxes, setShowFolderCheckboxes] = useState(false);
  /////////////////////// FUNCTIONS //////////////////////////////

  return (
    <Context.Provider value={{ setShowFolderCheckboxes, showFolderCheckboxes }}>
      {children}
    </Context.Provider>
  );
};

export const useFolderContext = () => useContext(Context);
