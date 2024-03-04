import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const createToken = (user, tokenType = "access") => {
  const expiresIn =
    {
      access: "50min",
      refresh: "10d",
    }[tokenType] || "10min";

  const tokenPayload = {
    sub: user._id.toString(),
    type: tokenType,
  };

  const options = { algorithm: "HS256", expiresIn };
  const tokenString = jwt.sign(tokenPayload, jwtSecret, options);

  return tokenString;
};
