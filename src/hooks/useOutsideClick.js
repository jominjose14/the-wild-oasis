import { useEffect, useRef } from 'react';

export function useOutsideClick(handler, listenDuringCapture = true) {
  const ref = useRef();

  useEffect(
    function() {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }

      document.addEventListener('click', handleClick, { capture: listenDuringCapture });

      // Cleanup callback
      return () => document.removeEventListener('click', handleClick);
    },
    [handler, listenDuringCapture]
  );

  return ref;
}
