import { useLinkContext } from "../context";
import propTypes from "prop-types";
const Checkbox = ({ link, originalIndex, isModal }) => {
  Checkbox.propTypes = {
    link: propTypes.object.isRequired,
    originalIndex: propTypes.number.isRequired,
    isModal: propTypes.bool,
  };
  const { handleSelect } = useLinkContext();
  console.log(link);
  console.log(!!link.selected);
  return (
    <input
      type="checkbox"
      name="checkbox"
      id="checkbox"
      className="mt-2"
      checked={!!link.selected}
      onChange={() => handleSelect(originalIndex, isModal)}
    />
  );
};

export default Checkbox;
