import React, { useRef } from "react";
import { styles } from "../../style";
import { useInputsContext } from "../../Context/InputsContext";
import { useAppContext } from "../../Context/AppContext";
const Input = () => {
  
  const { setShowAdd,setShowCustomName, seturlInput, setButtonClicked } =
    useInputsContext();
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
          className="text-white text-xl font-bold pb-4"
        >
          Input link / Save your current tab
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
          <button
            className={`${styles.button1} button`}
            onClick={handleSaveTab}
          >
            SAVE TAB
          </button>
          <button
            className={`${styles.button2}`}
            onClick={() => setShowAdd(false)}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
