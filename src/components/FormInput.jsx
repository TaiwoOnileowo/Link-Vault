import { styles } from "../styles";
import { useModalLink } from "../hooks";
import propTypes from "prop-types";
const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  extraLabelClass,
  showSaveTab,
  error,
}) => {
  FormInput.propTypes = {
    label: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    extraLabelClass: propTypes.string,
    showSaveTab: propTypes.bool,
    error: propTypes.bool,
  };
  const { handleSaveTab, bounce, setBounce } = useModalLink();
  const handleSaveTabClick = () => {
    setBounce(true);
    setTimeout(() => {
      setBounce(false);
    }, 300);
    handleSaveTab();
  };
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={`${styles.label} ${extraLabelClass}`}>
        {label}
        {showSaveTab && (
          <button
            className={`text-xs text-white bg-primary px-2 rounded-md hover:bg-hoverPrimary ${
              bounce ? "animate-bounce" : null
            }`}
            onClick={handleSaveTabClick}
            type="button"
          >
            Click to save tab
          </button>
        )}
      </label>

      <input
        type={type}
        name={name}
        id={name}
        value={value}
        className={styles.input}
        onChange={onChange}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
