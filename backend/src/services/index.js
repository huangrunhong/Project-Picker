import { loginUser } from "./loginUser.js";
import { registerUser } from "./registerUser.js";
import { getUserProfile } from "./getUserProfile.js";
import { addLikeProduct } from "./addLikeProduct.js";
import { getAllProducts } from "./getAllProducts.js";
import { postNewProduct } from "./postNewProduct.js";
import { getProductDetail } from "./getProductDetails.js";
import { addFollow } from "./addFollow.js";
import { unFollow } from "./unFollow.js";
import { editUser } from "./editUser.js";
import { refreshToken } from "./refreshToken.js";
import { editProduct } from "./editProduct.js";
import { unlikeProduct } from "./unlikeProduct.js";
import { deleteProduct } from "./deleteProduct.js";
import { getFriends } from "./getFriends.js";

export const UserService = {
  registerUser,
  loginUser,
  getUserProfile,
  editUser,
  addFollow,
  unFollow,
  refreshToken,
  getFriends,
};

export const ProductService = {
  getAllProducts,
  postNewProduct,
  getProductDetail,
  editProduct,
  deleteProduct,
  addLikeProduct,
  unlikeProduct,
};
