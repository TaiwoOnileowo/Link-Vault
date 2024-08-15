import { useState, useRef, useEffect } from "react";

const useNav = () => {
  const [toggle, setToggle] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
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
