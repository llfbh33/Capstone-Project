// ThemeContext.js
import { createContext, useContext, useEffect } from "react";
import useTheme from "./useTheme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useTheme();

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  return useContext(ThemeContext);
}
