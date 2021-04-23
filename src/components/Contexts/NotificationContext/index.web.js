import React, {useEffect} from 'react';

export default ({children}) => {
  useEffect(() => {
    const splash = document.getElementById('splash');
    splash.style.display = 'none';
  }, []);
  return <>{children}</>;
};
