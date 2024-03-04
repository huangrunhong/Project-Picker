import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import clsx from "clsx";

import AuthorizationContext from "../contexts/AuthorizationContext";
import login from "../images/login.jpg";

import styles from "./Login.module.scss";
import Password from "../components/Password";

const Login = () => {
  const [_, setAccessToken] = useContext(AuthorizationContext);
  const navigate = useNavigate();
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const loginUser = async () => {
    if (!emailInput.current || !passwordInput.current) return;

    try {
      const params: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput.current.value,
          password: passwordInput.current.value,
        }),
      };
      const response = await fetch("/api/users/login", params);
      const { result } = await response.json();

      setAccessToken(result?.tokens?.accessToken);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={styles.root}>
      <img src={login} alt="login" />
      <div className={styles.form}>
        <h2>Login to Picker</h2>
        <input ref={emailInput} type="email" placeholder="Email" />
        <Password name="password" ref={passwordInput} placeholder="Password" />
        <button className="primary-button" onClick={loginUser}>
          Login
        </button>
        <Link className={clsx(styles.link, "outline-button")} to="/register">
          <span className="text-tiny text-muted">New to Picker?</span>
          <span>Sign up</span>
        </Link>
      </div>
    </section>
  );
};

export default Login;
