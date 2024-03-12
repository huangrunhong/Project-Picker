import User from "../model/User.js";

export const verifyEmail = async ({ userId, sixDigitCode }) => {
  const user = await User.findById(userId);

  if (!user) throw new Error(`could not find user mit ID ${userId}`);

  if (sixDigitCode === user.sixDigitCode) {
    user.emailVerified = true;
  }
  await user.save();

  return userToProfileInfo(user);
};
const userToProfileInfo = ({ _id, user_name, bio, photo_url }) => {
  _id, user_name, bio, photo_url;
};
