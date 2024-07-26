import Modal from ".";
import ModalLink from "./ModalLink";
import ModalDeleteAll from "./ModalDeleteAll";
import { useAppContext } from "../../../context";
import ModalFolder from "./ModalFolder";
import ModalAddLinksToFolder from "./ModalAddLinksToFolder.jsx";

const ModalContent = () => {
  const { modalText } = useAppContext();

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
        ) : (
          <ModalLink />
        )}
      </>
    </Modal>
  );
};

export default ModalContent;
