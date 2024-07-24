import React from "react";
import { styles } from "../styles";
import { useModalLink } from "../hooks";
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
      {error && <p className="text-xs text-red-500">Url is required</p>}
    </div>
  );
};

export default FormInput;
