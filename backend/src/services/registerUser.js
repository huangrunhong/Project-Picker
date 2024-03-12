import User from "../model/User.js";
import { generateRandomSalt, hashPassword } from "../utils/hash.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

export const registerUser = async (userInfo) => {
  const foundUser = await User.findOne({ email: userInfo.email });
  if (foundUser) throw new Error(`User with email : ${userInfo.email} exist!`);

  const passwordSalt = generateRandomSalt();
  const passwordHash = hashPassword(userInfo.password, passwordSalt);
  const createDate = new Date().toString().slice(0, 19);

  const user = await User.create({
    name: userInfo.name,
    email: userInfo.email,
    password: passwordHash,
    passwordSalt: passwordSalt,
    bio: userInfo.bio,
    country: userInfo.country,
    city: userInfo.city,
    createAt: createDate,
    emailVerified: true,
  });

  await sendVerificationEmail(user);

  return user;
};
