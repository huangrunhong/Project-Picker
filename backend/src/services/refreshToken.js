import User from "../model/User.js";
import { createToken } from "../utils/jwt.js";

export const refreshToken = async (authenticatedUserId) => {
  const foundUser = await User.findById(authenticatedUserId);

  if (!foundUser) throw new Error("User doesn't exist anymore");

  const newAccessToken = createToken(foundUser, "access");

  return { newAccessToken };
};
