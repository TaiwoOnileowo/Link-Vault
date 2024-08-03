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
}:{
  label: string,
  type: string,
  name: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  extraLabelClass?: string,
  showSaveTab?: boolean,
  error?: boolean,
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
            className={`text-xs text-white bg-primary-2 px-2 rounded-md hover:bg-hoverPrimary ${
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
