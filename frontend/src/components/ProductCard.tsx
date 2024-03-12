import { useContext, useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Product from "../types/Product";
import styles from "./ProductCard.module.scss";

import ToggleLikeButton from "./ToggleLikeButton";
import Avatar from "./Avatar";
import AuthorizationContext from "../contexts/AuthorizationContext";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
  initiative?: boolean;
};

const ProductCard = ({ product, compact, initiative }: ProductCardProps) => {
  const [liked, setLiked] = useState(product.liked);
  const [accessToken] = useContext(AuthorizationContext);

  if (!product) {
    return null;
  }

  const onClickLike = (next: boolean) => {
    const count = next ? liked + 1 : liked - 1;

    setLiked(count < 0 ? 0 : count);
  };

  const deleteProduct = async () => {
    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${accessToken}` },
      });

      await response.json();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.card}>
        <Link to={`/product/${product._id}`}>
          <img src={product.photos[0]} />
        </Link>
        <div className={styles.name}>
          <h4>{product.name}</h4>
          {initiative ? (
            <div className={styles.initiativeButtons}>
              <Link to={`/edit-product/${product._id}`}>
                <button className="icon-button">
                  <i className="ri-edit-box-line"></i>
                </button>
              </Link>
              <button className="icon-button" onClick={deleteProduct}>
                <i className="ri-delete-bin-line"></i>
              </button>
            </div>
          ) : (
            <ToggleLikeButton productId={product._id} onClick={onClickLike} />
          )}
        </div>
      </div>
      {compact && (
        <div className={clsx(styles.label)}>
          <div className={styles.labelPart}>
            <Avatar small avatar={product.owner.profileImage} />
            <Link to={`/user/${product.owner._id}/profile`}>
              <h4>{product.owner.name}</h4>
            </Link>
          </div>
          <div className={styles.labelPart}>
            <ToggleLikeButton />
            <p>{liked}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
