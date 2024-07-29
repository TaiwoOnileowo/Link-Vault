import propTypes from "prop-types";
import { useProceedToAddLinks } from "../../../../hooks";
const ProceedToAddLinks = ({ showModal }) => {
  ProceedToAddLinks.propTypes = {
    showModal: propTypes.bool,
  };
  const { handleClick } = useProceedToAddLinks();
  return (
    <h1 className="dark:text-dimWhite text-black font-medium text-xs my-2">
      Empty folder, proceed to{" "}
      <span
        className="underline text-primary-2 cursor-pointer"
        onClick={() => handleClick(showModal, null)}
      >
        add links
      </span>
    </h1>
  );
};

export default ProceedToAddLinks;
