import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    passwordSalt: { type: String },
    sixDigitCode: {
      type: String,
      default: () => Math.floor(Math.random() * 1000000),
    },
    emailVerified: { type: Boolean, default: false },
    profileImage: { type: String },
    occupation: { type: String },
    bio: { type: String },
    hobbies: [{ type: String }],
    country: { type: String },
    city: { type: String },
    createdAt: { type: Date },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    follows: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { collection: "users", timestamps: true }
);

userSchema.methods.toProfileInfo = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    profileImage: this.profileImage,
    occupation: this.occupation,
    bio: this.bio,
    hobbies: this.hobbies,
    country: this.country,
    city: this.city,
    products: this.products,
    likes: this.likes,
    followers: this.followers,
    follows: this.follows,
  };
};

const User = mongoose.model("User", userSchema);

export default User;
