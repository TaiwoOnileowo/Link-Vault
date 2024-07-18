import React, { useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import { useAppContext } from "../../../Context/AppContext";
import { useLinkContext } from "../../../Context/LinkContext";
import { MdOutlineCancel } from "react-icons/md";

const Modal = (props) => {
  const { children } = props;
  const {
    modalRef,
    isOpen,
    setIsOpen,
    modalText,
    handleClose,
    links,
    setLinks,
    folderInputs,
    setFolderInputs,
  } = useAppContext();
  const { setShowCheckboxes } = useLinkContext();

  useImperativeHandle(modalRef, () => ({
    open() {
      setIsOpen(true);
    },
    close() {
      setIsOpen(false);
    },
  }));

  const handleModalClose = () => {
    // Move links back to their original positions in the links array
    const movedBackLinks = folderInputs.links.map((link) => ({
      ...link,
      selected: false,
    }));

    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      movedBackLinks.forEach((link) => {
        newLinks.splice(link.originalIndex, 0, link);
      });
      return newLinks;
    });

    const updatedLinks = JSON.parse(localStorage.getItem("Links")) || [];
    movedBackLinks.forEach((link) => {
      updatedLinks.splice(link.originalIndex, 0, link);
    });
    localStorage.setItem("Links", JSON.stringify(updatedLinks));

    // Clear the folderInputs links
    setFolderInputs((prevFolderInputs) => ({
      ...prevFolderInputs,
      links: [],
    }));

    handleClose();
    setShowCheckboxes(false);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full h-full">
      <div className="relative bg-white dark:bg-darkAlt px-3 p-4 rounded-lg shadow-lg text-black max-w-[85%] max-h-[70%] scrollbar">
        <span
          className="text-dimWhite absolute top-0 right-0 cursor-pointer hover:text-white"
          onClick={handleModalClose}
        >
          <MdOutlineCancel />
        </span>
        <h1 className="text-xl font-bold text-black dark:text-white text-center mb-3">
          {modalText}
        </h1>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
