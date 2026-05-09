import { useState } from "react";

// is this page in use any more?
function useNavigation() {
  const [navigation, setNavigation] = useState({
    main: 'home',
    mid: null,
    small: null,
  });

  return [navigation, setNavigation];
}

export default useNavigation;