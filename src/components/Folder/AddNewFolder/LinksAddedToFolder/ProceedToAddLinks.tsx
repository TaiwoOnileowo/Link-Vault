import { useProceedToAddLinks } from "../../../../hooks";
import { useFolderContext } from "../../../../context";
const ProceedToAddLinks = ({ showModal }: { showModal: boolean }) => {
  const { handleClick } = useProceedToAddLinks();
  const { openFolderIndex } = useFolderContext();
  return (
    <h1 className="dark:text-dimWhite text-black font-medium text-xs my-2">
      Empty folder, proceed to{" "}
      <span
        className="underline text-primary-2 cursor-pointer"
        onClick={() => handleClick(showModal, null, openFolderIndex)}
      >
        add links
      </span>
    </h1>
  );
};

export default ProceedToAddLinks;
