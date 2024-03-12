import User from "./User";

type Product = {
  _id: string;
  name: string;
  owner: User;
  description: string;
  field: string;
  colors: string[];
  materials: string[];
  finish: string;
  photos: string[];
  liked: number;
  comments: string[];
};

export default Product;
