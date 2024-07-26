
import ModalLink from "../../Layout/Modal/ModalLink";
import useAddLinksToFolder from "../../../hooks/useAddLinksToFolder";
import ExistingLinks from "./ExistingLinks";

const AddLinksToFolder = () => {
  const { handleChooseFromExistingLinks, showLinks } = useAddLinksToFolder();
  return (
    <div>
      <ModalLink />
      <div className="flex flex-col items-center mt-2 text-white">
        <p className="text-sm text-slate-300">OR</p>
        <h2
          className="bg-primary/50 p-2 px-4 text-sm cursor-pointer hover:bg-primary rounded-md mt-2"
          onClick={handleChooseFromExistingLinks}
        >
          Choose from your existing links
        </h2>
      </div>
      {showLinks && <ExistingLinks />}
    </div>
  );
};

export default AddLinksToFolder;
