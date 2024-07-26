
import { styles } from "../../../styles";
import { useAppContext } from "../../../context";
import { useNameFolder } from "../../../hooks";
const NameFolder = () => {
  const { folderInputs, modalText } = useAppContext();
  const { handleChange, handleClick } = useNameFolder();

  return (
    <div className="w-full">
      <h1 className={`mb-2 ${styles.label}`}>Folder Name</h1>
      <input
        type="text"
        className={`${styles.input} w-full`}
        name="folder_name"
        value={folderInputs.folder_name}
        onChange={handleChange}
      />
      <div className="w-full flex justify-end mt-2">
        <button
          className={
            folderInputs.folder_name ? styles.button1 : styles.button1Disabled
          }
          onClick={handleClick}
        >
          {modalText.includes("Rename Folder") ? "Done" : "Next: Add Links +"}
        </button>
      </div>
    </div>
  );
};

export default NameFolder;
