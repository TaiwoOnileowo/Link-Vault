import React from "react";
import Modal from ".";
import ModalLink from "./ModalLink";
import ModalDeleteAll from "./ModalDeleteAll";
import { useAppContext } from "../../../context/AppContext.jsx";
import ModalFolder from "./ModalFolder";

const ModalContent = () => {
  const { modalText } = useAppContext();

  return (
    <Modal>
      <>
        {modalText.includes("Delete") ? (
          <ModalDeleteAll />
        ) : modalText.includes("Link") ? (
          <ModalLink />
        ) : (
          <ModalFolder />
        )}
      </>
    </Modal>
  );
};

export default ModalContent;
