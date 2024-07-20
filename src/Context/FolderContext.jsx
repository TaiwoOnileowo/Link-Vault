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
  // const [showFolderLinkCheckboxes, setShowFolderLinkCheckboxes] =
  //   useState(false);
  const [index, setIndex] = useState(null);
  /////////////////////// FUNCTIONS //////////////////////////////

  return (
    <Context.Provider
      value={{
        setShowFolderCheckboxes,
        showFolderCheckboxes,
        index,
        setIndex,
        // showFolderLinkCheckboxes,
        // setShowFolderLinkCheckboxes,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useFolderContext = () => useContext(Context);
