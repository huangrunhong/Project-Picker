import Product from "../model/Product.js";

export const deleteProduct = async ({ productId, userId }) => {
  const product = await Product.findByIdAndDelete(productId);
  console.log(product);
  console.log(userId);
  // if (product.owner !== userId)
  //   throw new Error("Could not delete product before login");

  return product;
};
