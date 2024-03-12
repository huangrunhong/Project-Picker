import { UserService } from "../services/index.js";
import { catchAsync } from "../utils/catchAsync.js";

const registerUserCtrl = catchAsync(
  async (req, res) => {
    const userInfo = await UserService.registerUser(req.body);
    res.json({ success: true, result: { userInfo } });
  },
  { message: "Could not register" }
);

const verifyEmailCtrl = catchAsync(
  async (req, res) => {
    const userId = req.body.userId;
    const sixDigitCode = req.body.sixDigitCode;
    const result = await UserService.verifyEmail({ userId, sixDigitCode });
    res.json({ success: true, result });
  },
  { message: "Could not verify email" }
);

const loginUserCtrl = catchAsync(
  async (req, res) => {
    const result = await UserService.loginUser(req.body);
    req.session.refreshToken = result.tokens.refreshToken;
    res.json({ success: true, result: result });
  },
  { message: "Could not login" }
);

const logoutUserCtrl = catchAsync(
  async (req, res) => {
    if (req.verifiedUserClaims.type !== "refresh")
      throw new Error("Token must be of type 'refresh'");

    req.session.refreshToken = null;

    res.json({ success: true });
  },
  { message: "Could not log out" }
);

const getUserProfileCtrl = catchAsync(
  async (req, res) => {
    const userId = req.params.userId;

    const result = await UserService.getUserProfile(userId);
    res.json({ success: true, result });
  },
  { message: "Could not get user" }
);

const editUserCtrl = catchAsync(
  async (req, res) => {
    const userId = req.verifiedUserClaims.sub;
    const userInfo = req.body;
    if (req.file) {
      userInfo.profileImage = `http://localhost:8888/users/${req.file.originalname}`;
    }

    const result = await UserService.editUser({
      userId,
      userInfo,
    });
    res.json({ success: true, result });
  },
  { message: "Could not edit user" }
);

const addFollowCtrl = catchAsync(
  async (req, res) => {
    const toBeFollowedId = req.params.userId;

    const authorizedId = req.verifiedUserClaims.sub;

    const result = await UserService.addFollow(toBeFollowedId, authorizedId);
    res.json({ success: true, result });
  },
  { message: "Could not follow" }
);

const unFollowCtrl = catchAsync(
  async (req, res) => {
    const beFollowedId = req.params.userId;
    const authorizedId = req.verifiedUserClaims.sub;
    const result = await UserService.unFollow(beFollowedId, authorizedId);
    res.json({ success: true, result });
  },
  { message: "Could not cancel follow " }
);

const postRefreshTokenCtrl = catchAsync(
  async (req, res) => {
    if (req.verifiedUserClaims.type !== "refresh") {
      throw new Error("Token must be of type 'refresh'");
    }

    const authenticatedUserId = req.verifiedUserClaims.sub;
    const result = await UserService.refreshToken(authenticatedUserId);
    res.json({ success: true, result });
  },
  { message: "Could not refresh token user" }
);

const getFriendsCtrl = catchAsync(
  async (req, res) => {
    const userId = req.params.userId;
    const result = await UserService.getFriends(userId);
    res.json({ success: true, result });
  },
  { message: "Could not get Friends" }
);

export const UserController = {
  registerUserCtrl,
  loginUserCtrl,
  logoutUserCtrl,
  getUserProfileCtrl,
  editUserCtrl,
  addFollowCtrl,
  unFollowCtrl,
  postRefreshTokenCtrl,
  getFriendsCtrl,
  verifyEmailCtrl,
};
