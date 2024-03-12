import User from "../model/User.js";

export const getUserProducts = async (userId) => {
  const foundUser = await User.findById(userId).populate("products");
  console.log(foundUser);
  return foundUser.products;
};
