import React, {useEffect} from 'react';

export default ({children}) => {
  useEffect(() => {
    // TODO: remove splash screen
    const splash = document.getElementById('splash');
    splash.style.display = 'none';
  }, []);
  return <>{children}</>;
};
