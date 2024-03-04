import { Link } from "react-router-dom";
import clsx from "clsx";

import login from "../images/login.jpg";

import { useRef, useState } from "react";

import Password from "../components/Password";

import styles from "./Login.module.scss";

const Register = () => {
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const repeatPasswordInput = useRef<HTMLInputElement>(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const hideErrorMessage = () => setShowErrorMessage(false);

  const createAccount = () => {
    setShowErrorMessage(true);

    if (
      !nameInput.current ||
      !emailInput.current ||
      !passwordInput.current ||
      !repeatPasswordInput.current
    ) {
      return;
    }

    if (
      !nameInput.current.checkValidity() ||
      !emailInput.current.checkValidity() ||
      !passwordInput.current.checkValidity()
    ) {
      return;
    }

    const params: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameInput.current.value,
        email: emailInput.current.value,
        password: passwordInput.current.value,
      }),
    };

    fetch("/api/users/register", params);
  };

  return (
    <section className={styles.root}>
      <img src={login} alt="login" />
      <div
        className={clsx(styles.form, {
          [styles.showErrorMessage]: showErrorMessage,
        })}
      >
        <h2>Register to Picker</h2>
        <input
          ref={nameInput}
          type="text"
          name="name"
          placeholder="Name"
          required
          minLength={2}
          onChange={hideErrorMessage}
        />
        <small className={styles.errorMessage}>
          Username must be at least two letters
        </small>
        <input
          ref={emailInput}
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={hideErrorMessage}
        />
        <small className={styles.errorMessage}>
          Please give a valid email address
        </small>

        <Password
          ref={passwordInput}
          name="password"
          placeholder="Password"
          onChange={hideErrorMessage}
        />
        <small className={styles.errorMessage}>
          Password must be at least two letters
        </small>
        <Password
          ref={repeatPasswordInput}
          name="repeatPassword"
          placeholder="Repeat your password"
          onChange={hideErrorMessage}
        />
        <small className={styles.errorMessage}>Passwords are not same</small>
        <button className="primary-button" onClick={createAccount}>
          Create account
        </button>
        <Link className={clsx(styles.link, "outline-button")} to="/login">
          <small className="text-tiny text-muted">Have a account?</small>
          <span>Log in</span>
        </Link>
      </div>
    </section>
  );
};

export default Register;
