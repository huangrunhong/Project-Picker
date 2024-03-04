import useEvent from "./useEvent";

const clickAway = (element: HTMLElement | null, target: EventTarget | null) =>
  element && target instanceof HTMLElement && !element.contains(target);

const useClickAway = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void,
  active: boolean
) => {
  const onClickAway = (event: MouseEvent) =>
    clickAway(ref.current, event.target) && callback();

  useEvent(document.body, "mousedown", onClickAway, !!active);
};

export default useClickAway;
