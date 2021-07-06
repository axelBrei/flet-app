import {useEffect, useRef} from 'react';

function useStopableInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return;
    }

    const id = setInterval(() => {
      if (savedCallback.current?.() ?? false) {
        clearInterval(id);
      }
    }, delay);

    return () => {
      try {
        clearInterval(id);
      } catch (e) {}
    };
  }, [delay]);
}

export default useStopableInterval;
