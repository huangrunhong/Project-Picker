import { useContext, useRef } from "react";
import Layout from "../components/Layout";
import AuthorizationContext from "../contexts/AuthorizationContext";

import styles from "./PostProduct.module.scss";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import fetchUser from "../services/fetchUser";

const Setting = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [accessToken] = useContext(AuthorizationContext);
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) return null;

  const improveProfile = async () => {
    if (!ref.current) return;

    const profile = new FormData(ref.current);

    const response = await fetch("/api/users/profile", {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: profile,
    });
    await response.json();

    alert("Your profile has been updated!");
    await fetchUser(user._id, setUser);
    navigate(`/user/${user?._id}/profile`);
  };

  return (
    <Layout className={styles.postProduct}>
      <h1>Please improve your profile</h1>
      <form ref={ref}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          minLength={2}
          placeholder="Name"
          defaultValue={user.name}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          minLength={2}
          placeholder="Email"
          defaultValue={user.email}
        />

        <label htmlFor="profileImage">profileImage: </label>
        <input type="file" name="profileImage" placeholder="profileImage" />

        <label htmlFor="occupation">occupation: </label>
        <input
          type="text"
          name="occupation"
          placeholder="occupation"
          defaultValue={user.occupation}
        />

        <label htmlFor="bio">Bio: </label>
        <input
          type="text"
          name="bio"
          placeholder="Bio"
          defaultValue={user.bio}
        />

        <label htmlFor="hobbies">Hobbies: </label>
        <input
          type="text"
          name="hobbies"
          placeholder="hiking, football, ..."
          defaultValue={user.hobbies}
        />

        <label htmlFor="country">Country: </label>
        <input
          type="text"
          name="country"
          placeholder="Country"
          defaultValue={user.country}
        />

        <label htmlFor="city">City: </label>
        <input
          type="text"
          name="city"
          placeholder="City"
          defaultValue={user.city}
        />
      </form>

      <button className="primary-button" onClick={improveProfile}>
        Submit
      </button>
    </Layout>
  );
};

export default Setting;
