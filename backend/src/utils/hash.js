import crypto from "crypto";
// 加密password
export const hash = (inputPW) =>
  crypto.createHash("sha512").update(inputPW).digest("hex");

export const generateRandomSalt = () =>
  crypto.randomBytes(64).toString("base64");

export const hashPassword = (password, salt) => hash(`${password}${salt}`);
