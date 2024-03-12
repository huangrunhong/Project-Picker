import User from "../model/User.js";
import Product from "../model/Product.js";

export const addLikeProduct = async (productId, userId) => {
  const foundProduct = await Product.findById(productId);

  if (!foundProduct)
    throw new Error(`product with ID ${productId} does not exist`);

  const productLikedByUser = await User.findOne({
    _id: userId,
    likes: { $in: [productId] },
  });

  if (productLikedByUser)
    throw new Error(`Product with ID ${productId} ist already by user liked`);

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { likes: productId } }
  );

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    { $inc: { liked: 1 } }
  );
  console.log({ updatedProduct, updatedUser });

  updatedProduct.save();
  await updatedUser.save();
  const product = await Product.findById(productId);
  const user = await User.findById(userId);

  return { product };
};
