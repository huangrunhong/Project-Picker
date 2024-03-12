import Product from "./Product";

type User = {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  profileImage: string | undefined;
  occupation: string | undefined;
  bio: string | undefined;
  hobbies: string[];
  country: string | undefined;
  city: string | undefined;
  createAt: string;
  products: Product[];
  likes: Product[];
  followers: User[];
  follows: User[];
};

export default User;
