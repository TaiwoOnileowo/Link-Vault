import { styles } from "../../../styles";
import { useModalDeleteAll } from "../../../hooks";
import { useSelectOptions } from "../../../hooks";
import { useAppContext } from "../../../context";
const ModalDeleteAll = () => {
  const { handleCancel } = useModalDeleteAll();
  const { handleDelete } = useSelectOptions();
  const { handleClose } = useAppContext();
  return (
    <div>
      <div className="flex gap-4 justify-center" id="modal-delete-form">
        <button
          className={styles.button1}
          onClick={() => {
            handleDelete(true);
            handleClose();
          }}
        >
          Yes
        </button>
        <button type="button" className={styles.button2} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalDeleteAll;
