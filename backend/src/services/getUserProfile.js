import User from "../model/User.js";

export const getUserProfile = async (userId) => {
  const foundUser = await User.findById(userId);
  if (!foundUser) throw new Error(`User with id ${userId} does not exist`);

  return foundUser.toProfileInfo();
};
