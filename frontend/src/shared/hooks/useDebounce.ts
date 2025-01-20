import { useCallback, useRef } from "react";

export const useDebounce = <T extends unknown[]>(fn: (...args: T) => void, delay = 500) => {
  const timeoutRef = useRef<number>();

  return useCallback(
    (...args: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => fn.call(null, ...args), delay) as unknown as number;
    },
    [fn, delay],
  );
};
