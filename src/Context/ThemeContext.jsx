import { useState, useContext, createContext, useEffect } from "react";
import { initialDarkMode } from "../constants/initialStates";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
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

export const useThemeContext = () => useContext(ThemeContext);
