import { styles } from "../styles";
import { useModalLink } from "../hooks";
import React from "react";
import { motion } from "framer-motion";
const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  extraLabelClass,
  showSaveTab,
  error,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  extraLabelClass?: string;
  showSaveTab?: boolean;
  error?: string;
}) => {
  const { handleSaveTab } = useModalLink();

  console.log(error);
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={`${styles.label} ${extraLabelClass}`}>
        {label}
        {showSaveTab && (
          <motion.button
            className={`text-xs text-white bg-primary-2 px-2 rounded-md `}
            animate={{
              scale: [0.8, 1.2, 1],
            }}
            whileHover={{ scale: 1.1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            onClick={handleSaveTab}
            type="button"
          >
            Click to save tab
          </motion.button>
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
