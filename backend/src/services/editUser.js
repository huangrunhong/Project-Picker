import User from "../model/User.js";

export const editUser = async ({ userId, userInfo }) => {
  const user = await User.findById(userId);

  if (!user) throw new Error(`User must login before edit profile`);

  user.set(userInfo);

  user.save();

  return user.toJSON();
};
