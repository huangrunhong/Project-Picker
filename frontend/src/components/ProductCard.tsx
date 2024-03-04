import { useContext, useEffect, useState } from "react";
import Product from "../types/Product";
import styles from "./ProductCard.module.scss";
import clsx from "clsx";
import UserContext from "../contexts/UserContext";
import AuthorizationContext from "../contexts/AuthorizationContext";

type ProductCardProps = { product: Product };

const ProductCard = ({ product }: ProductCardProps) => {
  const [user] = useContext(UserContext);
  const [accessToken] = useContext(AuthorizationContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(!!user?.likes.includes(product._id));
  }, [user, product]);

  const toggleLike = async () => {
    if (!user || !accessToken) return;

    const next = !liked;
    setLiked(next);

    const addLikeUrl = `/api/products/${product._id}/like`;
    const unLikeUrl = `/api/products/${product._id}/unlike`;

    const response = await fetch(next ? addLikeUrl : unLikeUrl, {
      method: "POST",
      headers: { authorization: `Bearer ${accessToken}` },
    });

    await response.json();
  };

  return (
    <div className={styles.card}>
      <img src={product.photos[0]} />
      <div className={styles.name}>
        <h4>{product.name}</h4>
        <button
          className={clsx({ [styles.liked]: liked })}
          onClick={toggleLike}
        >
          {liked ? (
            <i className="ri-heart-fill"></i>
          ) : (
            <i className="ri-heart-line"></i>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
