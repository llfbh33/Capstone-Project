import { useEffect, useState } from "react";

function useNavigation() {
  const [navigation, setNavigation] = useState({
    main: 'home',
    mid: 'notebooks',
    small: null,
  });

  useEffect(() => {
    // Save to localStorage whenever theme changes
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

export default useTheme;
