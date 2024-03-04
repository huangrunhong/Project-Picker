import User from "../model/User.js";
import { hashPassword } from "../utils/hash.js";
import { createToken } from "../utils/jwt.js";

export const loginUser = async ({ email, password }) => {
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) throw new Error(`User with email: ${email} does not exist`);

  const passwordHash = hashPassword(password, foundUser.passwordSalt);
  const passwordMatch = passwordHash === foundUser.password;

  if (!passwordMatch) throw new Error("Password does not match");

  const accessToken = createToken(foundUser, "access");
  const refreshToken = createToken(foundUser, "refresh");

  return {
    userInfo: foundUser.toProfileInfo(),
    tokens: { accessToken, refreshToken },
  };
};
