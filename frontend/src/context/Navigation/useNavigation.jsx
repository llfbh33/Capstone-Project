import { useState } from "react";

// NO LONGER IN USE
function useNavigation() {
  const [navigation, setNavigation] = useState({
    main: 'home',
    mid: null,
    small: null,
  });

  return [navigation, setNavigation];
}

export default useNavigation;