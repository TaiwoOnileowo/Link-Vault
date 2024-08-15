import React from "react";
import { useModalLink } from "../../../hooks";
import FormInput from "../../FormInput";
import { styles } from "../../../styles";
import { useAppContext, useModalContext } from "../../../context";
import { AppContextType, ModalContextType } from "../../../types";

const ModalLink = () => {
  const {
    handleSubmit,
    handleChange,
    handleCancel,
    error,
    handleSaveToFolder,
  } = useModalLink();
  const { inputs, modalText } = useModalContext() as ModalContextType;

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit}
      id="modal-link-form"
    >
      <FormInput
        label="Url"
        type="text"
        name="url"
        value={inputs.url}
        extraLabelClass="inline-flex gap-2"
        showSaveTab={!modalText.includes("Edit Link") && true}
        onChange={handleChange}
        error={!!error}
      />
      <div className="mt-2">
        <FormInput
          label="Custom Name (Optional)"
          type="text"
          name="url_name"
          value={inputs.url_name}
          onChange={handleChange}
        />
      </div>

      {modalText.includes("Create New Folder") ||
      modalText.includes("Save Links To Folder") ? (
        <div className="flex justify-end gap-2">
          <button
            className={styles.button1}
            type="submit"
            // onClick={() => setMenu("View Links")}
          >
            Add
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-end h-fit gap-4">
          <div className="flex justify-start">
            <button
              className={styles.button2}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className={styles.button1} type="submit">
              Save
            </button>
          </div>
          {!modalText.includes("Edit Link") && (
            <p
              className="text-xs my-[10px] text-black dark:text-white underline cursor-pointer"
              onClick={() => {
                inputs.url && handleSaveToFolder();
              }}
            >
              Save to folder
            </p>
          )}
        </div>
      )}
    </form>
  );
};

export default ModalLink;
