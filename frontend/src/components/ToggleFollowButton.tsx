import { useContext, useEffect, useState } from "react";

import AuthorizationContext from "../contexts/AuthorizationContext";
import UserContext from "../contexts/UserContext";
import User from "types/User";
import fetchUser from "../services/fetchUser";

type ToggleFollowButtonProps = { userId?: string };

const isFollowing = (user: User | undefined, userId: string | undefined) =>
  user !== undefined && user.follows.some((follow) => follow._id === userId);

const ToggleFollowButton = ({ userId }: ToggleFollowButtonProps) => {
  const [accessToken] = useContext(AuthorizationContext);
  const [user, setUser] = useContext(UserContext);
  const [following, setFollowing] = useState<boolean>(false);

  useEffect(() => {
    setFollowing(isFollowing(user, userId));
  }, [user, userId]);

  const toggleFollow = async () => {
    if (!user || !userId || !accessToken) return;

    const next = !following;

    setFollowing(next);

    const followUrl = `/api/users/${userId}/profile/add-follow`;
    const notFollowUrl = `/api/users/${userId}/profile/not-follow`;

    const response = await fetch(next ? followUrl : notFollowUrl, {
      method: "POST",
      headers: { authorization: `Bearer ${accessToken}` },
    });

    await response.json();
    await fetchUser(user._id, setUser);
  };

  return (
    <button className="primary-button" onClick={toggleFollow}>
      {following ? "Following" : "Follow"}
    </button>
  );
};

export default ToggleFollowButton;
