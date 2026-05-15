// ThemeContext.js
import { createContext, useContext, useState } from "react";
// NO LONGER IN USE
const NavContext = createContext();

export function NavProvider({ children }) {
    const [activeNav, setActiveNav] = useState("home");


  return (
    <NavContext.Provider value={{ activeNav, setActiveNav }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  return useContext(NavContext);
}

