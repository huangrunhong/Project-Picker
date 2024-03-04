import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import UserContext from "../contexts/UserContext";

import styles from "./Profile.module.scss";
import Avatar from "../components/Avatar";
import User from "../types/User";
import { useParams, Link } from "react-router-dom";
import Tab from "../components/Tab";
import Product from "../types/Product";
import ProductCard from "../components/ProductCard";

const Profile = () => {
  const params = useParams();
  const [authorizedUser] = useContext(UserContext);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState("products");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (authorizedUser?._id === params.userId) {
      setUser(authorizedUser);
    } else {
      const fetchUser = async () => {
        try {
          const response = await fetch(`/api/users/${params.userId}/profile/`);
          const { result } = await response.json();

          setUser(result);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products`);
          const { result } = await response.json();

          setProducts(result);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
      fetchProduct();
    }
  }, [authorizedUser]);

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className={styles.profileInfo}>
        <Avatar avatar={authorizedUser?.profileImage} large />
        <div className={styles.information}>
          <h2>{user.name}</h2>
          <p>
            {user.city}, {user.country}
          </p>
          <p>
            followers - {user.followers?.length ?? 0} | following -
            {user.follows?.length ?? 0}
          </p>
          {authorizedUser ? (
            <button className="primary-button">Edit</button>
          ) : (
            <button className="primary-button">Follow</button>
          )}
        </div>
      </div>
      <div>
        <Tab
          tabs={[
            { value: "products", label: "Products" },
            { value: "likes", label: "Likes" },
            { value: "follows", label: "Follows" },
            { value: "followers", label: "Followers" },
          ]}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {selectedTab === "products" && (
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}

            <Link to="/post-product" className={styles.addProduct}>
              <i className="ri-add-large-line"></i>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
