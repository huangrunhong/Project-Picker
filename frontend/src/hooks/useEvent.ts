import { useEffect, useRef } from "react";

const useEvent = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement | null,
  name: K,
  handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void,
  mounted = true
) => {
  const callback = useRef(handler);

  useEffect(() => {
    callback.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!mounted || !element) {
      return;
    }

    element.addEventListener(name, callback.current, { passive: false });

    return () => element.removeEventListener(name, callback.current);
  }, [name, element, mounted]);
};

export default useEvent;
