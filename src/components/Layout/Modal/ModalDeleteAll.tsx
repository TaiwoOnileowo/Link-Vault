import React from "react";
import { styles } from "../../../styles";
import { useModalDeleteAll } from "../../../hooks";
import { useSelectOptions } from "../../../hooks";
import { useAppContext, useModalContext } from "../../../context";
import { AppContextType, ModalContextType } from "../../../types";
const ModalDeleteAll = () => {
  const { handleCancel } = useModalDeleteAll();
  const { handleDelete } = useSelectOptions();
  const { handleClose } = useModalContext() as ModalContextType;
  return (
    <div>
      <div className="flex gap-4 justify-center" id="modal-delete-form">
        <button
          className={styles.button2}
          onClick={() => {
            handleDelete(true);
            handleClose();
          }}
        >
          Yes
        </button>
        <button type="button" className={styles.button1} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalDeleteAll;
