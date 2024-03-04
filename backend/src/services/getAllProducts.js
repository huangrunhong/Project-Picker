import Product from "../model/Product.js";

export const getAllProducts = async (query) => {
  const products = await Product.find(query);
  return products;
};
