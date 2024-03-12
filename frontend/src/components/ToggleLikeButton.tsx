import { useContext, useEffect, useState } from "react";
import clsx from "clsx";

import UserContext from "../contexts/UserContext";
import AuthorizationContext from "../contexts/AuthorizationContext";

import styles from "./ToggleLikeButton.module.scss";

type ToggleLikeButtonProps = {
  productId?: string;
  onClick?: (next: boolean) => void;
};

const ToggleLikeButton = ({
  productId,
  onClick = () => {},
}: ToggleLikeButtonProps) => {
  const [user] = useContext(UserContext);
  const [accessToken] = useContext(AuthorizationContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    productId && setLiked(!!user?.likes.find((like) => like._id === productId));
  }, [user, productId]);

  const toggleLike = async () => {
    if (!user || !productId) return;
    if (!accessToken) window.alert("Please Login");

    const next = !liked;

    const addLikeUrl = `/api/products/${productId}/like`;
    const unLikeUrl = `/api/products/${productId}/unlike`;

    try {
      const response = await fetch(next ? addLikeUrl : unLikeUrl, {
        method: "POST",
        headers: { authorization: `Bearer ${accessToken}` },
      });

      await response.json();
      setLiked(next);
      onClick(next);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className={clsx(styles.toggleLikeButton, { [styles.liked]: liked })}
      onClick={toggleLike}
    >
      {liked ? (
        <i className="ri-heart-fill"></i>
      ) : (
        <i className="ri-heart-line"></i>
      )}
    </button>
  );
};

export default ToggleLikeButton;
