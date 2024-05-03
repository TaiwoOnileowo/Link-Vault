import React, { useRef } from "react";
import { styles } from "../../style";

const Input = ({
  setShowCustomName,
  seturlInput,
  setButtonClicked,
  setLinks,
}) => {
  const inputRef = useRef();

  const handleSaveInput = () => {
    if (inputRef.current.value) {
      setShowCustomName(true);
      seturlInput(inputRef.current.value);
      inputRef.current.value = "";
    }
    setButtonClicked("save-input");
  };

  const handleSaveTab = () => {
    setShowCustomName(true);
    setButtonClicked("save-tab");
  };

  const handleClearAll = () => {
    setLinks([]);
    localStorage.clear();
  };

  return (
    <div className=" flex flex-col">
      <div className="flex flex-col">
        <label
          htmlFor="url"
          className="text-white text-[24px] font-semibold pb-4"
        >
          Drop an Input or Save Your Current Tab
        </label>
        <input
          type="text"
          name="url"
          id="url"
          className={`${styles.input}`}
          ref={inputRef}
        />
        <div className="flex gap-2">
          <button
            className={`${styles.button} button`}
            onClick={handleSaveInput}
          >
            SAVE INPUT
          </button>
          <button className={`${styles.button} button`} onClick={handleSaveTab}>
            SAVE TAB
          </button>
          <button
            className="bg-white text-[#2a4ff6] py-[10px] px-6 border-none font-semibold cursor-pointer rounded-[4px] my-[10px] clear-btn"
            onDoubleClick={handleClearAll}
          >
            CLEAR ALL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
