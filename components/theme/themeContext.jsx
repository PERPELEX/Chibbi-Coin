// src/components/theme/ThemeContext.js
import React, { createContext, useState } from "react";
import theme from "./theme";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => ({
      ...prevTheme,
      colors: {
        ...prevTheme.colors,
        primary: prevTheme.colors.primary === "#6200ee" ? "#03dac4" : "#6200ee",
      },
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
