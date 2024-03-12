import Product from "../model/Product.js";

export const getProductDetail = async (productId) => {
  const foundProduct = await Product.findById(productId).populate({
    path: "owner",
    select: "-password -passwordSalt",
  });

  if (!foundProduct)
    throw new Error(`The product with id ${productId} does not exist!`);

  return foundProduct;
};
