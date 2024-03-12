import User from "../model/User.js";

export const addFollow = async (toBeFollowedId, authorizedId) => {
  const toBeFollowedUserExist = await User.findOne({
    _id: authorizedId,
    follows: { $in: [toBeFollowedId] },
  });

  if (toBeFollowedUserExist)
    throw new Error(`User with Id ${toBeFollowedId} already exist`);

  const toBeFollowedUser = await User.findOneAndUpdate(
    { _id: toBeFollowedId },
    { $push: { followers: authorizedId } }
  );

  if (!toBeFollowedUser)
    throw new Error(`User with ID ${toBeFollowedId} does not exist!`);

  const followingUser = await User.findOneAndUpdate(
    { _id: authorizedId },
    { $push: { follows: toBeFollowedId } }
  );

  if (!followingUser) throw new Error(`User must login before follow others`);

  await toBeFollowedUser.save();
  await followingUser.save();

  const updatedBeFollowedUser = await User.findById(toBeFollowedId);

  const updatedFollowingUser = await User.findById(authorizedId);

  return { updatedBeFollowedUser, updatedFollowingUser };
};
