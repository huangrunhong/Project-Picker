import Product from "../model/Product.js";
import User from "../model/User.js";

export const postNewProduct = async ({ productInfo, photos, userId }) => {
  const photoUrlArray = photos.map(
    (photo) => `http://localhost:8888/products/${photo.originalname}`
  );

  const newProduct = await Product.create({
    name: productInfo.name,
    owner: userId,
    photos: photoUrlArray,
    description: productInfo.description,
  });

  await User.findOneAndUpdate(
    { _id: userId },
    { $push: { products: newProduct._id } }
  );

  return { newProduct };
};
