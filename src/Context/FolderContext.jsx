import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";

const Context = createContext();

export const AppContext = ({ children }) => {
  ////////////////////////////         STATE ////////////////////////////
  const [folders, setFolders] = useState();
  /////////////////////// FUNCTIONS //////////////////////////////

  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export const useFolderContext = () => useContext(Context);
