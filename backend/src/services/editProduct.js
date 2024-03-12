import Product from "../model/Product.js";

export const editProduct = async ({ productId, productInfo, userId }) => {
  const product = await Product.findById(productId);

  if (product.owner.toString() !== userId)
    throw new Error("Could not edit Product before login");
  product.set(productInfo);
  product.save();

  return product.toJSON();
};
