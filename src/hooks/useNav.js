import { useState, useRef, useEffect } from "react";

const useNav = () => {
  const [toggle, setToggle] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return {
    toggle,
    setToggle,
    navRef,
  };
};

export default useNav;
