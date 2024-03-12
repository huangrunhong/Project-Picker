import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import AuthorizationContext from "../contexts/AuthorizationContext";
import Product from "types/Product";
import UserContext from "../contexts/UserContext";

import styles from "./PostProduct.module.scss";
import fetchUser from "../services/fetchUser";

const EditProduct = () => {
  const [user, setUser] = useContext(UserContext);
  const ref = useRef<HTMLFormElement>(null);
  const [accessToken] = useContext(AuthorizationContext);
  const params = useParams();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/products/${params.productId}`, {
      method: "PATCH",
      headers: { authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then(({ result }) => setProduct(result))
      .catch((error) => console.log(error));
  }, []);

  if (!product || !user) return null;

  const editProduct = async () => {
    if (!ref.current) return;

    const currentProduct = new FormData(ref.current);

    const response = await fetch(`/api/products/${params.productId}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: currentProduct,
    });
    const { result } = await response.json();

    console.log(result);

    alert("You successfully edited the product!");

    await fetchUser(user._id, setUser);
    console.log(user);

    navigate(`/user/${product.owner}/profile`);
  };

  return (
    <Layout className={styles.postProduct}>
      <h1>Please edit your Product</h1>
      <form ref={ref}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          minLength={2}
          placeholder="Name"
          defaultValue={product.name}
        />
        <label htmlFor="description">Description: </label>
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={10}
          placeholder="Description"
          defaultValue={product.description}
        ></textarea>
        <label htmlFor="field">Field:</label>
        <select name="field" id="field" defaultValue={product.field}>
          <option value="consumer electronics">consumer electronics</option>
          <option value="home products">home products</option>
          <option value="transportation">transportation</option>
          <option value="industrial equipment">industrial equipment</option>
          <option value="outdoor gear">outdoor gear</option>
          <option value="medical devices">medical devices</option>
        </select>
        <label htmlFor="materials">Materials:</label>
        <div className={styles.materials} defaultValue={product.materials}>
          <label>
            <input type="checkbox" name="materials" value="metal" /> Metal
          </label>
          <label>
            <input type="checkbox" name="materials" value="wood" /> Wood
          </label>
          <label>
            <input type="checkbox" name="materials" value="plastic" /> Plastic
          </label>
          <label>
            <input type="checkbox" name="materials" value="cloth" /> Cloth
          </label>
          <label>
            <input type="checkbox" name="materials" value="glass" /> Glass
          </label>
          <label>
            <input type="checkbox" name="materials" value="others" /> Others
          </label>
        </div>
        <label htmlFor="finish">Finish: </label>
        <select name="finish" defaultValue={product.finish}>
          <option value="smooth">Smooth</option>
          <option value="rough">Rough</option>
          <option value="dull">Dull</option>
          <option value="matte">Matte</option>
          <option value="reflective">Reflective</option>
        </select>
        <label htmlFor="photos">Photos:</label>
        <input type="file" multiple name="photos" />
      </form>
      <button className="primary-button" onClick={editProduct}>
        Submit
      </button>
    </Layout>
  );
};

export default EditProduct;
