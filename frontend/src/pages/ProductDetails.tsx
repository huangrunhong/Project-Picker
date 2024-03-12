import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Avatar from "../components/Avatar";
import Layout from "../components/Layout";
import Product from "../types/Product";

import ToggleLikeButton from "../components/ToggleLikeButton";
import ToggleFollowButton from "../components/ToggleFollowButton";

import styles from "./ProductDetails.module.scss";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const params = useParams();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [moreProducts, setMoreProducts] = useState<Product[]>([]);

  const nextPhoto = () => {
    if (!product) return;
    setPhotoIndex((photoIndex + 1) % product.photos.length);
  };

  const lastPhoto = () => {
    if (!product) return;
    setPhotoIndex((photoIndex - 1) % product.photos.length);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`/api/products/${params.productId}`);
        const { result } = await response.json();

        return result as Product;
      } catch (error) {
        console.log(error);
      }
    };

    const fetchMoreProducts = async (fetchedProduct: Product) => {
      try {
        const response = await fetch(
          `/api/products/user/${fetchedProduct.owner._id}`,
          {
            method: "GET",
          }
        );
        const { result } = await response.json();

        const otherProducts = result?.filter(
          (product: Product) => product._id !== params.productId
        );

        return otherProducts.slice(0, 3) as Product[];
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProduct = async () => {
      const product = await fetchProductDetails();
      const moreProducts = product
        ? (await fetchMoreProducts(product)) ?? []
        : [];

      setProduct(product);
      setMoreProducts(moreProducts);
    };

    fetchProduct();
  }, [params.productId]);

  if (!product) {
    return null;
  }

  return (
    <Layout className={styles.productDetails}>
      <div className={styles.user}>
        <div className={styles.labelPart}>
          <Avatar avatar={product.owner.profileImage} small />
          <Link to={`/user/${product.owner._id}/profile`}>
            <h4>{product.owner.name}</h4>
          </Link>
        </div>
        <div className={styles.labelPart}>
          <ToggleLikeButton productId={product._id} />

          <ToggleFollowButton userId={product.owner._id} />
        </div>
      </div>
      <div className={styles.product}>
        <div className={styles.productPhotos}>
          <button className="icon-button" onClick={lastPhoto}>
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <img src={product.photos.at(photoIndex)} alt={product.name} />
          <button className="icon-button" onClick={nextPhoto}>
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
      <div className={styles.showMore}>
        <div className={styles.title}>
          <hr />
          <Link to={`/user/${product.owner._id}/profile`}>
            <Avatar avatar={product.owner.profileImage} />
          </Link>
          <hr />
        </div>
        <div className={styles.moreProducts}>
          {moreProducts.map((product: Product) => (
            <Link key={product._id} to={`/product/${product._id}`}>
              <ProductCard product={product} key={product._id} />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
