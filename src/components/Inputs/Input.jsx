import React, { useRef } from "react";
import { styles } from "../../style";

const Input = ({
  setShowCustomName,
  seturlInput,
  setButtonClicked,
  setShowAdd,
  
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

  return (
    <div className=" flex flex-col fade-in">
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
            className={`${styles.button1} button`}
            onClick={handleSaveInput}
          >
            SAVE INPUT
          </button>
          <button className={`${styles.button1} button`} onClick={handleSaveTab}>
            SAVE TAB
          </button>
          <button
            className={`${styles.button2}`}
            onClick={()=>setShowAdd(false)}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
