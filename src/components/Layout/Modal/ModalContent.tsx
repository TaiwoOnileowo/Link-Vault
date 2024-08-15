import Modal from ".";
import ModalLink from "./ModalLink";
import ModalDeleteAll from "./ModalDeleteAll";
import { useAppContext, useModalContext } from "../../../context";
import ModalFolder from "./ModalFolder";
import ModalAddLinksToFolder from "./ModalAddLinksToFolder.tsx";
import ModalIcon from "./ModalIcon.tsx";
import React from "react";
import { ModalContextType } from "../../../types.ts";
const ModalContent = () => {
  const { modalText } = useModalContext() as ModalContextType;

  return (
    <Modal>
      <>
        {modalText.includes("Delete") ? (
          <ModalDeleteAll />
        ) : modalText.includes("Save Links To Folder") ||
          modalText.includes("Create New Folder") ||
          modalText.includes("Rename Folder") ? (
          <ModalFolder />
        ) : modalText.includes("Save to Folder") ? (
          <ModalAddLinksToFolder />
        ) : modalText.includes("Choose an Icon") ? (
          <ModalIcon />
        ) : (
          <ModalLink />
        )}
      </>
    </Modal>
  );
};

export default ModalContent;
