// ThemeContext.js
import { createContext, useContext, useEffect, useState } from "react";

const NavContext = createContext();

export function NavProvider({ children }) {
    const [activeNav, setActiveNav] = useState({
      main: { title: 'home', route: '/', open: false },
      mid: { title: 'notebooks', route: '/', open: false},
      small: { title: null, route: null, open: false},
    });


  return (
    <NavContext.Provider value={{ activeNav, setActiveNav }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  return useContext(NavContext);
}
