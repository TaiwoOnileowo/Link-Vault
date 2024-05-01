import React, { forwardRef } from "react";
import { styles } from "../style";

const Inputs = ({
  handleChange,
  handleName,
  show,
  handleSaveInput,
  handleClear,
  saveTab,
  whoClicked,
  refs,
}) => {
  return (
    <div className="w-full flex flex-col px-8 pt-12">
      <div className="flex flex-col pr-4">
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
          onChange={handleChange}
          ref={refs.inputRef}
        />
        <div className="flex gap-2">
          <button className={`${styles.button}`} onClick={handleSaveInput}>
            SAVE INPUT
          </button>
          <button className={`${styles.button}`} onClick={saveTab}>
            SAVE TAB
          </button>
          <button
            className="bg-white text-[#2a4ff6] py-[10px] px-6 border-none font-semibold cursor-pointer rounded-[4px] my-[10px] clear-btn"
            onDoubleClick={handleClear}
          >
            CLEAR ALL
          </button>
        </div>
      </div>
      {show && (
        <div className="flex flex-col pr-4 transition-all pt-6">
          <label
            htmlFor="url"
            className="text-white text-[24px] font-semibold pb-4"
          >
            Wanna Give it a Name?
          </label>
          <input
            type="text"
            name="url_name"
            id="url_name"
            className={`${styles.input}`}
            onChange={handleChange}
            ref={refs.tabRef}
          />

          <div className="flex gap-4">
            <button
              className={`${styles.button}`}
              onClick={() => handleName(whoClicked)}
            >
              NEVER MIND
            </button>
            <button
              className={`${styles.button}`}
              onClick={() => handleName(whoClicked)}
            >
              SAVE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inputs;
