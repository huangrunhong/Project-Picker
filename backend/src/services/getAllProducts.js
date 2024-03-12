import Product from "../model/Product.js";

const sortBy = (sort) => {
  if (sort === "popular") return { liked: -1 };

  if (sort === "oldest") return { createdAt: 1 };

  return { createdAt: -1 };
};
const searchBy = (search) => {
  if (search)
    return {
      name: new RegExp(search, "i"),
    };
  return {};
};

export const getAllProducts = async ({ search, sort, limit = 6, page = 0 }) => {
  const products = await Product.find(searchBy(search))
    .populate({
      path: "owner",
      select: "-password -passwordSalt",
    })
    .sort(sortBy(sort))
    .skip(limit * page)
    .limit(limit);

  const count = await Product.countDocuments();

  return { products, count };
};
