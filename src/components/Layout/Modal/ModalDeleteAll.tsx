import React from "react";
import { styles } from "../../../styles";
import { useModalDeleteAll } from "../../../hooks";
import { useSelectOptions } from "../../../hooks";
import { useModalContext } from "../../../context";
import { ModalContextType } from "../../../types";
import { motion } from "framer-motion";
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
        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          type="button"
          className={styles.button1}
          onClick={handleCancel}
        >
          Cancel
        </motion.button>
      </div>
    </div>
  );
};

export default ModalDeleteAll;
