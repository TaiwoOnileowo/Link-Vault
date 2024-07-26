
import FolderList from "../../Folder/FolderList";
import { styles } from "../../../styles";
import { useLinkContext } from "../../../context";
const ModalAddLinksToFolder = () => {
  const { handleAddLinksToFolder } = useLinkContext();
  return (
    <div>
      <p className="swipe-right text-xs text-white italic opacity-50 ">Tick to pick</p>
      <div className="mt-2 h-[250px] min-w-[250px]  border border-white rounded-md p-2 py-3">
        <FolderList isModal={true} />
      </div>
      <div className="w-full flex justify-end">
        <button
          className={styles.button1}
          onClick={() => handleAddLinksToFolder()}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ModalAddLinksToFolder;
