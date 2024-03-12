import User from "../model/User.js";

export const getFriends = async (userId) => {
  const friends = await User.find({
    $and: [{ followers: { $in: [userId] } }, { follows: { $in: [userId] } }],
  });

  if (!friends) throw new Error(`You must login before get friends`);

  return friends;
};
