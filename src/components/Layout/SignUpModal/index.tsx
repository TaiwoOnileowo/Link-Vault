import React from "react";
import { createPortal } from "react-dom";
import { useAppContext } from "../../../context";
import { MdOutlineCancel } from "react-icons/md";
import { styles } from "../../../styles";
import { AppContextType } from "../../../types";
const SignUpModal = () => {
  const { setLinks, setFolders, setShowSignUpModal, setModalDismissed } =
    useAppContext() as AppContextType;

  const handleCloseModal = () => {
    setShowSignUpModal(false);
    setFolders([]);
    setLinks([]);
    setModalDismissed(true);
  };
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 w-full h-full">
      <div className="relative bg-white dark:bg-d-darkGray  p-6 rounded-lg shadow-lg text-black max-w-[88%] max-h-[70%] scrollbar">
        <span
          className="text-primary-2 hover:text-hoverBlue dark:text-dimWhite absolute top-0 right-0 cursor-pointer dark:hover:text-white"
          onClick={handleCloseModal}
        >
          <MdOutlineCancel />
        </span>
        <h1 className="text-xl font-bold text-primary-2 dark:text-d-lightGray text-center mb-3">
          You are not signed in😬
        </h1>
        <div className="flex gap-4 justify-center">
          <button className={styles.button2} onClick={handleCloseModal}>
            Guest mode
          </button>

          <a href="https://linkvaultapp.vercel.app/login" target="_blank">
            <button
              className={styles.button1}
              // onClick={() => setModalDismissed(true)}
            >
              Sign in
            </button>
          </a>
        </div>
      </div>
    </div>,
    document.getElementById("signupmodal")
  );
};

export default SignUpModal;
