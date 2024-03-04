import { useContext, useRef } from "react";

import Layout from "../components/Layout";
import AuthorizationContext from "../contexts/AuthorizationContext";

import styles from "./PostProduct.module.scss";

const PostProduct = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [accessToken] = useContext(AuthorizationContext);

  const addProduct = async () => {
    if (!ref.current) return;

    const product = new FormData(ref.current);

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: product,
    });
    const { result } = await response.json();

    console.log(result);
  };

  return (
    <Layout className={styles.postProduct}>
      <h1>Post your Product</h1>
      <form ref={ref}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" minLength={2} placeholder="Name" />
        <label htmlFor="description">Description: </label>
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={10}
          placeholder="Description"
        ></textarea>
        <label htmlFor="field">Field:</label>
        <select name="field" id="field">
          <option value="consumer electronics">consumer electronics</option>
          <option value="home products">home products</option>
          <option value="transportation">transportation</option>
          <option value="industrial equipment">industrial equipment</option>
          <option value="outdoor gear">outdoor gear</option>
          <option value="medical devices">medical devices</option>
        </select>
        <label htmlFor="materials">Materials:</label>
        <div className={styles.materials}>
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
        <select name="finish">
          <option value="smooth">Smooth</option>
          <option value="rough">Rough</option>
          <option value="dull">Dull</option>
          <option value="matte">Matte</option>
          <option value="reflective">Reflective</option>
        </select>
        <label htmlFor="photos">Photos:</label>
        <input type="file" multiple name="photos" />
      </form>
      <button className="primary-button" onClick={addProduct}>
        Submit
      </button>
    </Layout>
  );
};

export default PostProduct;
