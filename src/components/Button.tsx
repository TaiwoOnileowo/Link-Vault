import React from "react";
import { styles } from "../styles";
import { motion } from "framer-motion";
const Button = ({
  className,
  handleClick,
  title,
  animate = true,
  disabled,
  type,
  ...props
}: {
  className?: string;
  handleClick?: () => void;
  title: string;
  disabled?: boolean;
  animate?: boolean;
  props?: any;
  type?: string;
}) => {
  const defaultClass = ` ${styles.button1}`;
  console.log(animate, "animate");
  return (
    <>
      {animate || !disabled ? (
        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className={className ?? defaultClass}
          onClick={handleClick}
          {...props}
        >
          {title}
        </motion.button>
      ) : (
        <button
          className={className ?? defaultClass}
          onClick={handleClick}
          {...props}
        >
          {title}
        </button>
      )}
    </>
  );
};

export default Button;
