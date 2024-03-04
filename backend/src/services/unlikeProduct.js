import Product from "../model/Product.js";
import User from "../model/User.js";

export const unlikeProduct = async ({ productId, userId }) => {
  const foundProduct = await User.findOne({ likes: { $in: productId } });
  if (!foundProduct)
    throw new Error(
      `Could not dislike the product with ID ${productId} before like it`
    );
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { likes: productId } }
  );

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    { $inc: { liked: -1 } }
  );
  console.log({ updatedProduct, updatedUser });
  await updatedProduct.save();
  await updatedUser.save();

  return {
    updatedUser,
    updatedProduct,
  };
};
