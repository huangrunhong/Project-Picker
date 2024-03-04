import Product from "../model/Product.js";

export const deleteProduct = async ({ productId, userId }) => {
  const product = await Product.findByIdAndDelete(productId);

  if (product.owner !== userId)
    throw new Error("Could not delete product before login");

  return product;
};
