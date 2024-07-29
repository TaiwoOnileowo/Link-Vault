import Modal from ".";
import ModalLink from "./ModalLink";
import ModalDeleteAll from "./ModalDeleteAll";
import { useAppContext } from "../../../context";
import ModalFolder from "./ModalFolder";
import ModalAddLinksToFolder from "./ModalAddLinksToFolder.jsx";
import ModalIcon from "./ModalIcon.jsx";

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
