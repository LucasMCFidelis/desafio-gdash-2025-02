import { createContext, useContext } from "react";

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("Theme Provider not found");

  return context;
};
