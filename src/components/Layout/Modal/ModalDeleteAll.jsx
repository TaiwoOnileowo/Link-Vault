import React from "react";

import { styles } from "../../../styles";
import { useModalDeleteAll } from "../../../hooks";
const ModalDeleteAll = () => {
  const { handleSubmit, handleCancel } = useModalDeleteAll();
  return (
    <div>
      <form
        className="flex gap-4 justify-center"
        onSubmit={handleSubmit}
        id="modal-delete-form"
      >
        <button type="submit" className={styles.button1}>
          Yes
        </button>
        <button type="button" className={styles.button2} onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ModalDeleteAll;
