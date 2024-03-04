import User from "../model/User.js";

export const addFollow = async (toBeFollowedId, followingId) => {
  const toBeFollowedUser = await User.findOneAndUpdate(
    { _id: toBeFollowedId },
    { $push: { followers: followingId } }
  );

  if (!toBeFollowedUser)
    throw new Error(`User with ID ${toBeFollowedId} does not exist!`);

  const followingUser = await User.findOneAndUpdate(
    { _id: followingId },
    { $push: { follows: toBeFollowedId } }
  );

  if (!followingUser) throw new Error(`User must login before follow others`);

  await toBeFollowedUser.save();
  await followingUser.save();

  const updatedBeFollowedUser = await User.findById(toBeFollowedId);

  const updatedFollowingUser = await User.findById(followingId);

  return { updatedBeFollowedUser, updatedFollowingUser };
};
