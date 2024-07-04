import React, { useState, createContext, useContext } from "react";
const Context = createContext();
export const InputsContext = ({ children }) => {
  const [showCustomName, setShowCustomName] = useState(false);
  const [urlInput, seturlInput] = useState("");
  const [buttonClicked, setButtonClicked] = useState("");
  return (
    <Context.Provider
      value={{
        showCustomName,
        setShowCustomName,
        urlInput,
        seturlInput,
        buttonClicked,
        setButtonClicked,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useInputsContext = () => useContext(Context);
