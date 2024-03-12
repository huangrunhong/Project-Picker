import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Layout from "../components/Layout";
import UserContext from "../contexts/UserContext";
import Avatar from "../components/Avatar";
import User from "../types/User";
import Tab from "../components/Tab";

import ProductCard from "../components/ProductCard";

import styles from "./Profile.module.scss";
import UserCard from "../components/UserCard";
import ToggleFollowButton from "../components/ToggleFollowButton";

const Profile = () => {
  const params = useParams();
  const [authorizedUser] = useContext(UserContext);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState("products");

  useEffect(() => {
    if (authorizedUser?._id === params.userId) {
      setUser(authorizedUser);
    } else {
      const fetchUser = async () => {
        try {
          const response = await fetch(`/api/users/${params.userId}/profile`);
          const { result } = await response.json();

          setUser(result);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, [authorizedUser, params.userId]);

  if (!user) {
    return null;
  }

  const friends = user.followers.filter((follower) =>
    user.follows.some((follow) => follow._id === follower._id)
  );

  return (
    <Layout>
      <div className={styles.profileInfo}>
        <Avatar avatar={user?.profileImage} large />
        <div className={styles.information}>
          <h2>{user.name}</h2>
          <p>{user.occupation}</p>
          <p>{user.email}</p>
          <p>
            {user.city}, {user.country}
          </p>
          {authorizedUser?._id === params.userId ? (
            <Link to="/setting">
              <button className="primary-button">Edit</button>
            </Link>
          ) : (
            <ToggleFollowButton userId={params.userId} />
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
            { value: "friends", label: "Friends" },
          ]}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {selectedTab === "products" && (
          <div className={styles.products}>
            {user.products.map((product) => (
              <ProductCard key={product._id} product={product} initiative />
            ))}

            <Link to="/post-product" className={styles.addProduct}>
              <i className="ri-add-large-line"></i>
            </Link>
          </div>
        )}
        {selectedTab === "likes" && (
          <div className={styles.products}>
            {user.likes.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        {selectedTab === "follows" && (
          <div className={styles.products}>
            {user.follows.map((follow) => (
              <Link key={follow._id} to={`/user/${follow._id}/profile`}>
                <UserCard user={follow} />
              </Link>
            ))}
          </div>
        )}
        {selectedTab === "followers" && (
          <div className={styles.products}>
            {user.followers.map((follower, index) => (
              <UserCard key={index} user={follower} />
            ))}
          </div>
        )}

        {selectedTab === "friends" && (
          <div className={styles.products}>
            {friends.map((friend, index) => (
              <UserCard key={index} user={friend} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
