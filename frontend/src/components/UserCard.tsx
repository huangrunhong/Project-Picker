import User from "types/User";
import Avatar from "./Avatar";

import styles from "./UserCard.module.scss";

type UserCardProps = { user?: User };
const UserCard = ({ user }: UserCardProps) => {
  if (!user) return null;

  return (
    <div className={styles.userCard}>
      <Avatar avatar={user.profileImage} large />

      <h2>{user.name}</h2>

      <h4>{user.email}</h4>
      <p>{user.occupation}</p>
      <p>{user.bio}</p>
      <p>
        {user.city}-{user.country}
      </p>
    </div>
  );
};

export default UserCard;
