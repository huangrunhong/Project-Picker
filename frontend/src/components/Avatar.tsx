import clsx from "clsx";
import styles from "./Avatar.module.scss";

type AvatarProps = { avatar?: string; large?: boolean; small?: boolean };

const Avatar = ({ avatar, large, small }: AvatarProps) => {
  return (
    <div
      className={clsx(
        styles.avatar,
        { [styles.large]: large },
        { [styles.small]: small }
      )}
    >
      {avatar ? (
        <img src={avatar} width="100%" alt="avatar" />
      ) : (
        <i className="ri-user-3-line"></i>
      )}
    </div>
  );
};

export default Avatar;
