import { useState } from "react";
import login from "../images/login.jpg";

import styles from "./Login.module.scss";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const [sixDigitCode, setSixDigitCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const { userId } = useParams();

  async function verifyEmail() {
    if (!sixDigitCode) {
      setErrorMessage(
        "please enter your six digit code, we have sent you an email"
      );
      return;
    }
    fetch("http://localhost:9999/users/verifyEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, sixDigitCode }),
    })
      .then((res) => res.json())
      .then(({ success, result, message }) => {
        if (!success)
          return setErrorMessage(message || "Email verification failed");
        console.log({ result });
        setErrorMessage("");
        setSuccessMessage(
          "verification successful, you can now login to your account"
        );
      });

    navigate("/login");
  }

  return (
    <section className={styles.root}>
      <img src={login} alt="login" />
      <div className={styles.form}>
        <h2>Verify your Email</h2>
        <h4>
          please enter the 6-digit code we sent to your email to enable login
        </h4>
        <input
          type="text"
          placeholder="enter 6-digit verification code"
          value={sixDigitCode}
          onChange={(event) => setSixDigitCode(event.target.value)}
        />

        <button className="primary-button" onClick={verifyEmail}>
          Verify Email
        </button>
      </div>
    </section>
  );
};

export default VerifyEmail;
