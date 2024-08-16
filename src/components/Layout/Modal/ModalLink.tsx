import React from "react";
import { useModalLink } from "../../../hooks";
import { styles } from "../../../styles";
import { useModalContext } from "../../../context";
import { ModalContextType } from "../../../types";
import { motion } from "framer-motion";
import FormInputs from "./FormInputs";
const ModalLink = () => {
  const {
    handleSubmit,
    handleChange,
    handleCancel,
    error,
    handleSaveToFolder,
  } = useModalLink();
  const { inputs, modalText, clickedIndex } =
    useModalContext() as ModalContextType;
  console.log(error);
  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit}
      id="modal-link-form"
    >
      <FormInputs error={error} />

      {/* {modalText.includes("Create New Folder") ||
      modalText.includes("Save Links To Folder") ? (
        <div className="flex justify-end gap-2">
          <button className={styles.button1} type="submit">
            Add
          </button>
        </div>
      ) : ( */}
      {/* todo:Fix the add buton in the folder add links */}
      <div className="flex justify-between items-end h-fit gap-4">
        <div className="flex justify-start">
          <button
            className={styles.button2}
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <motion.button
            className={styles.button1}
            type="submit"
            whileHover={{
              scale: 1.1,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            Save
          </motion.button>
        </div>

        <p
          className="text-xs my-[10px] text-black dark:text-white underline cursor-pointer"
          onClick={() => {
            inputs.url && handleSaveToFolder();
          }}
        >
          Save to folder
        </p>
      </div>
      {/* )} */}
    </form>
  );
};

export default ModalLink;
