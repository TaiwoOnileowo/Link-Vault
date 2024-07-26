
import { useNewFolder } from "../../hooks";
const NewFolder = () => {
  const { createFolder } = useNewFolder();

  return (
    <div className="w-full">
      <button
        className="rounded-md text-white bg-primary px-4 py-2 w-full"
        onClick={createFolder}
      >
        Add New Folder +
      </button>
    </div>
  );
};

export default NewFolder;
