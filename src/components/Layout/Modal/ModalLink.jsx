import React from "react";
import { useModalLink } from "../../../hooks";
import FormInput from "../../FormInput";
import { styles } from "../../../styles";
import { useAppContext } from "../../../context/AppContext";

const ModalLink = () => {
  const { handleSubmit, handleChange, handleCancel, error } = useModalLink();
  const { inputs, modalText } = useAppContext();

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
        error={error}
      />

      <FormInput
        label="Custom Name (Optional)"
        type="text"
        name="url_name"
        value={inputs.url_name}
        onChange={handleChange}
      />
      <FormInput
        label="Tags (separated by comma, Optional)"
        type="text"
        name="tags"
        value={inputs.tags}
        onChange={handleChange}
      />
      <div className="flex justify-start gap-2">
        <button className={styles.button1} type="submit">
          {modalText.includes("Folder") ? "Add" : "Save"}
        </button>
        <button className={styles.button2} type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ModalLink;
