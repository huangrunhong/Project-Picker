import express from "express";
import multer from "multer";
import { doJwtAuth } from "../middleware/doJwtAuth.js";
import { UserController } from "../controllers/UserController.js";

const storage = multer.diskStorage({
  destination: "./uploads/users",
  filename: (_, file, next) => {
    next(null, file.originalname);
  },
});

const uploadMiddleWare = multer({ storage: storage });

export const userRouter = express
  .Router()
  .post("/register", UserController.registerUserCtrl)
  .post("/login", UserController.loginUserCtrl)
  .post("/logout", doJwtAuth, UserController.logoutUserCtrl)
  .get("/:userId/profile", UserController.getUserProfileCtrl)
  .patch(
    "/profile",
    uploadMiddleWare.single("profileImage"),
    doJwtAuth,
    UserController.editUserCtrl
  )
  .post("/:userId/profile/add-follow", doJwtAuth, UserController.addFollowCtrl)
  .post("/:userId/profile/not-follow", doJwtAuth, UserController.unFollowCtrl)
  .post("/refreshToken", doJwtAuth, UserController.postRefreshTokenCtrl)
  .get("/friends", doJwtAuth, UserController.getFriendsCtrl);
