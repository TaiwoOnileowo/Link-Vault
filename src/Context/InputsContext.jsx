import React, { useState, createContext, useContext } from "react";
const Context = createContext();
export const InputsContext = ({ children }) => {
  const [showCustomName, setShowCustomName] = useState(false);
  const [urlInput, seturlInput] = useState("");
  const [buttonClicked, setButtonClicked] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  return (
    <Context.Provider
      value={{
        showCustomName,
        setShowCustomName,
        urlInput,
        seturlInput,
        buttonClicked,
        setButtonClicked,
        showAdd,
        setShowAdd
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useInputsContext = () => useContext(Context);
