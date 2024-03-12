import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import UserContext from "../contexts/UserContext";
import AuthorizationContext from "../contexts/AuthorizationContext";

import Dropdown from "./Dropdown";
import Avatar from "./Avatar";

import styles from "./Header.module.scss";

const Header = () => {
  const [user, setUser] = useContext(UserContext);
  const [active, setActive] = useState(false);
  const [_, setAccessToken] = useContext(AuthorizationContext);

  const logout = async () => {
    const response = await fetch("/api/users/logout", {
      method: "POST",
    });
    await response.json();
    setAccessToken(undefined);
    setUser(undefined);
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1>Produuucts</h1>
      </Link>
      {user && (
        <Dropdown active={active} setActive={setActive}>
          <button onClick={() => setActive(!active)}>
            <Avatar avatar={user.profileImage} />
          </button>
          <Dropdown.DropdownMenu>
            <Link to={`/user/${user._id}/profile`} className={styles.profile}>
              <Avatar avatar={user.profileImage} />
              {user.name}
            </Link>
            <Link to="/setting">Settings</Link>
            <Link to="/post-product">Upload Product</Link>
            <hr />
            <button onClick={logout}>Logout</button>
          </Dropdown.DropdownMenu>
        </Dropdown>
      )}
      {!user && (
        <Link to="/login" className="primary-button">
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;
