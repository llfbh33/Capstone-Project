// ThemeContext.js
import { createContext, useContext, useState } from "react";
// import { useLocation } from "react-router-dom";

const NavContext = createContext();

export function NavProvider({ children }) {
    // const { pathname } = useLocation();    // CAN ONLY BE USED IN A ROUTER LOCATION > MOVE TO LEFT NAV?
    const [activeNav, setActiveNav] = useState("home");

  // const activeNav = useMemo(() => {
  //   if (pathname === "/") return "home";
  //   if (pathname.startsWith("/all_entries")) return "all_entries";
  //   if (pathname.startsWith("/notebooks")) return "notebooks";
  //   if (pathname.startsWith("/entries")) return "entries";
  //   if (pathname.startsWith("/profile")) return "profile";

  //   return "home";
  // }, [pathname]);


  return (
    <NavContext.Provider value={{ activeNav, setActiveNav }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  return useContext(NavContext);
}

