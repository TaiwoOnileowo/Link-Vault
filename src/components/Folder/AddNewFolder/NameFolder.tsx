import { styles } from "../../../styles";
import { useAppContext } from "../../../context";
import useNameFolder from "../../../hooks/useNameFolder";

const NameFolder = () => {
  const { folderInputs, modalText } = useAppContext();
  const { handleChange, handleClick, error } = useNameFolder();

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
      {error && <p className="text-red-500 text-xs ">{error}</p>}
      <div className="w-full flex justify-end mt-2">
        <button
          className={
            folderInputs.folder_name && !error
              ? styles.button1
              : styles.button1Disabled
          }
          onClick={handleClick}
          disabled={!folderInputs.folder_name || error}
        >
          {modalText.includes("Rename Folder") ? "Done" : "Next: Add Links +"}
        </button>
      </div>
    </div>
  );
};

export default NameFolder;
