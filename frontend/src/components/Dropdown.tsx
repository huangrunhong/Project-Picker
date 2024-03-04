import { useRef } from "react";
import clsx from "clsx";

import useClickAway from "../hooks/useClickAway";

import styles from "./Dropdown.module.scss";

type DropdownProps = {
  children: React.ReactNode;
  active: boolean;
  setActive: (active: boolean) => void;
};

const DropdownMenu = ({ children }: React.PropsWithChildren) => (
  <div className={styles.menu}>{children} </div>
);

const Dropdown = ({ children, setActive, active }: DropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, () => setActive(false), active);

  return (
    <div
      ref={ref}
      className={clsx(styles.dropdown, { [styles.active]: active })}
    >
      {children}
    </div>
  );
};

Dropdown.DropdownMenu = DropdownMenu;

export default Dropdown;
