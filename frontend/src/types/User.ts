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
  products: string[];
  likes: string[];
  followers: string[];
  follows: string[];
};

export default User;
