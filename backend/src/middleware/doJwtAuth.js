import jwt from "jsonwebtoken";

const extractTokenFromRequest = (req) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const [authType, tokenString] = authorization.split(" ");

    if (authType !== "Bearer" || !tokenString) return null;
    else return tokenString;
  } else {
    return req.session.refreshToken;
  }
};

export async function doJwtAuth(req, res, next) {
  const invalidAuthRes = () =>
    res.status(401).json({ success: false, message: "Invalid authentication" });

  try {
    const tokenString = extractTokenFromRequest(req);
    const tokenPayload = jwt.verify(tokenString, process.env.JWT_SECRET);

    req.verifiedUserClaims = tokenPayload;
    next();
  } catch (error) {
    return invalidAuthRes();
  }
}
