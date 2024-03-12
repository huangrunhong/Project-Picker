import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import Product from "../types/Product";

import styles from "./Products.module.scss";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState("newest");

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `api/products?search=${search}&limit=${100}&sort=${sort}`
      );
      const { result } = await response.json();

      setProducts(result.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sort]);

  return (
    <Layout className={styles.home}>
      <section className={styles.functions}>
        <select
          name="sort"
          id="sort"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="popular">Popular</option>
        </select>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search..."
            onChange={(event) => setSearch(event.target.value)}
            value={search}
          />
          <button className="primary-button" onClick={fetchProducts}>
            Search
          </button>
        </div>
      </section>
      <section className={styles.productsGallery}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} compact />
        ))}
      </section>
      <div className={styles.pagination}></div>
    </Layout>
  );
};

export default Products;
