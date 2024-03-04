import User from "../model/User.js";

export const unFollow = async (beFollowedId, followingId) => {
  const beFollowedUser = await User.findOneAndUpdate(
    { _id: beFollowedId },
    { $pull: { followers: followingId } }
  );
  console.log(beFollowedUser);
  if (!beFollowedUser)
    throw new Error(`User with ID ${beFollowedUser} does not exist!`);

  const followingUser = await User.findOneAndUpdate(
    { _id: followingId },
    { $pull: { follows: beFollowedId } }
  );

  if (!followingUser) throw new Error(`User must login before follow others`);

  await beFollowedUser.save();
  await followingUser.save();

  const updatedBeFollowedUser = await User.findById(beFollowedId);

  const updatedFollowingUser = await User.findById(followingId);

  return { updatedBeFollowedUser, updatedFollowingUser };
};
