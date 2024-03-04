import express from "express";
import { ProductController } from "../controllers/ProductController.js";

import multer from "multer";
import { doJwtAuth } from "../middleware/doJwtAuth.js";

const storage = multer.diskStorage({
  destination: "./uploads/products/",
  filename: (_, file, next) => {
    next(null, file.originalname);
  },
});

const uploadMiddleWare = multer({ storage: storage });

export const productRouter = express
  .Router()
  .get("/", ProductController.getAllProductsCtrl)
  .post(
    "/",
    uploadMiddleWare.array("photos", 12),
    doJwtAuth,
    ProductController.postNewProductCtrl
  )
  .get("/:productId", ProductController.getProductDetailCtrl)
  .patch("/:productId", doJwtAuth, ProductController.editProductCtrl)
  .delete("/:productId", doJwtAuth, ProductController.deleteProductCtrl)
  .post("/:productId/like", doJwtAuth, ProductController.addLikeProductCtrl)
  .post("/:productId/unlike", doJwtAuth, ProductController.unlikeProductCtrl);
