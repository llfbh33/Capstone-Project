import { useEffect, useState } from "react";

function useTheme() {
  const [theme, setTheme] = useState(() => {
    // On first load, check localStorage
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    // Save to localStorage whenever theme changes
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

export default useTheme;
