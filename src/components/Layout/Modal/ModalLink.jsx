import { useModalLink } from "../../../hooks";
import FormInput from "../../FormInput";
import { styles } from "../../../styles";
import { useAppContext } from "../../../context";

const ModalLink = () => {
  const {
    handleSubmit,
    handleChange,
    handleCancel,
    error,
    handleSaveToFolder,
  } = useModalLink();
  const { inputs, modalText, setMenu } = useAppContext();

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit}
      id="modal-link-form"
    >
      <FormInput
        label="Url"
        type="text"
        name="url"
        value={inputs.url}
        extraLabelClass="inline-flex gap-2"
        showSaveTab={!modalText.includes("Edit Link") && true}
        onChange={handleChange}
        error={error}
      />
      <div className="mt-2">
        <FormInput
          label="Custom Name (Optional)"
          type="text"
          name="url_name"
          value={inputs.url_name}
          onChange={handleChange}
        />
      </div>

      {modalText.includes("Create New Folder") ||
      modalText.includes("Save Links To Folder") ? (
        <div className="flex justify-end gap-2">
          <button
            className={styles.button2}
            type="submit"
            // onClick={() => setMenu("View Links")}
          >
            Add
          </button>
          <button
            className={styles.button1}
            type="button"
            onClick={() => setMenu("View Links")}
          >
            Next: View Links
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-end h-fit">
          <div className="flex justify-start">
            <button className={styles.button1} type="submit">
              Save
            </button>
            <button
              className={styles.button2}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
          {!modalText.includes("Edit Link") && (
            <p
              className="text-xs my-[10px] text-primary underline cursor-pointer"
              onClick={handleSaveToFolder}
            >
              Save to folder
            </p>
          )}
        </div>
      )}
    </form>
  );
};

export default ModalLink;
