import React from "react";
import Modal from "./Modal";
import ModalLink from "./ModalLink";
import ModalDeleteAll from "./ModalDeleteAll";
import { useAppContext } from "../../../Context/AppContext";
import ModalFolder from "./ModalFolder";

const ModalContent = () => {
  const { modalText } = useAppContext();

  return (
    <Modal>
      <>
        {modalText.includes("Delete") ? (
          <ModalDeleteAll  />
        ) : modalText.includes("Link") ? (
          <ModalLink  />
        ) : (
          <ModalFolder/>
        )}
      </>
    </Modal>
  );
};

export default ModalContent;
