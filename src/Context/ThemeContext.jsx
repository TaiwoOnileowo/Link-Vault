import { useState, createContext, useEffect } from "react";
import { initialDarkMode } from "../constants/initialStates";
import proptype from "prop-types";
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  ThemeProvider.propTypes = {
    children: proptype.node.isRequired,
  };
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
