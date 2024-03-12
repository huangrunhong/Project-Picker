import { ProductService } from "../services/index.js";
import { catchAsync } from "../utils/catchAsync.js";

const getAllProductsCtrl = catchAsync(
  async (req, res) => {
    const result = await ProductService.getAllProducts(req.query);

    res.json({ success: true, result });
  },
  { message: "Could not get products" }
);

const postNewProductCtrl = catchAsync(
  async (req, res) => {
    const productInfo = req.body;
    const userId = req.verifiedUserClaims.sub;
    const photos = req.files;
    const result = await ProductService.postNewProduct({
      productInfo,
      photos,
      userId,
    });

    res.json({ success: true, result });
  },
  { message: "could not upload product" }
);

const getProductDetailCtrl = catchAsync(
  async (req, res) => {
    const productId = req.params.productId;

    const result = await ProductService.getProductDetail(productId);

    res.json({ success: true, result });
  },
  { message: "Could not get product details" }
);

const editProductCtrl = catchAsync(
  async (req, res) => {
    const productId = req.params.productId;
    const productInfo = req.body;
    const userId = req.verifiedUserClaims.sub;
    const result = await ProductService.editProduct({
      productId,
      productInfo,
      userId,
    });
    res.json({ success: true, result });
  },
  { message: "Could not get product details" }
);

const deleteProductCtrl = catchAsync(
  async (req, res) => {
    const productId = req.params.productId;
    const userId = req.verifiedUserClaims.sub;
    const result = await ProductService.deleteProduct({ productId, userId });
    res.json({ success: true, result });
  },
  { message: "Could not delete product" }
);

const addLikeProductCtrl = catchAsync(
  async (req, res) => {
    const userId = req.verifiedUserClaims.sub;
    const productId = req.params.productId;
    console.log(userId);
    const result = await ProductService.addLikeProduct(productId, userId);
    res.json({ success: true, result });
  },
  {
    message: "Could not add new like",
  }
);

const unlikeProductCtrl = catchAsync(
  async (req, res) => {
    const userId = req.verifiedUserClaims.sub;
    const productId = req.params.productId;
    console.log({ userId, productId });
    const result = await ProductService.unlikeProduct({ userId, productId });
    res.json({ success: true, result });
  },
  {
    message: "Could not unlike this product",
  }
);

const getUserProductsCtrl = catchAsync(
  async (req, res) => {
    const userId = req.params.userId;
    const result = await ProductService.getUserProducts(userId);
    res.json({ success: true, result });
  },
  {
    message: "could not get more products",
  }
);

export const ProductController = {
  getAllProductsCtrl,
  postNewProductCtrl,
  getProductDetailCtrl,
  editProductCtrl,
  deleteProductCtrl,
  addLikeProductCtrl,
  unlikeProductCtrl,
  getUserProductsCtrl,
};
