import { forwardRef, useState } from "react";

import styles from "./Password.module.scss";

type Ref = React.Ref<HTMLInputElement>;

type PasswordProps = {
  name: string;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Password = forwardRef((props: PasswordProps, ref: Ref) => {
  const [revealPassword, setRevealPassword] = useState(false);

  const iconClassName = revealPassword ? "ri-eye-line" : "ri-eye-close-line";

  const type = revealPassword ? "text" : "password";

  return (
    <div className={styles.passwordInput}>
      <input
        ref={ref}
        type={type}
        name={props.name}
        placeholder={props.placeholder}
        minLength={6}
        onChange={props.onChange}
      />
      <button onClick={() => setRevealPassword(!revealPassword)}>
        <i className={iconClassName}></i>
      </button>
    </div>
  );
});

export default Password;
