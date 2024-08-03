import { useLinkContext } from "../context";

const Checkbox = ({ link, originalIndex, isModal }:{
  link: { selected: any; };
  originalIndex: any;
  isModal?: boolean;
}) => {

  const { handleSelect } = useLinkContext();
  console.log(link);
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
