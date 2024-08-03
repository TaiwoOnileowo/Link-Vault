import { IoCheckmark } from "react-icons/io5";
import DisplayedLinks from "../../Home/DisplayedLinks";
import useAddLinksToFolder from "../../../hooks/useAddLinksToFolder";
import { useLinkContext } from "../../../context";
const ExistingLinks = () => {
  const { linksSelected, handleClick } = useAddLinksToFolder();
  const { existingLinks } = useLinkContext();
  return (
    <div className="max-h-[300px] max-w-[300px] overflow-x-hidden text-xs mt-4 text-primary scrollbar">
      <div className="flex justify-between items-center px-4">
        <p className="text-black dark:text-dimWhite">
          Selected({linksSelected.length})
        </p>
        {linksSelected.length > 0 && (
          <span onClick={handleClick} className="text-black dark:text-white cursor-pointer">
            <IoCheckmark size={18} />
          </span>
        )}
      </div>
      <DisplayedLinks display={existingLinks} isExistingLinks={true} />
    </div>
  );
};

export default ExistingLinks;
