import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: String, required: true },
    description: { type: String, required: true },
    field: {
      type: String,
      enum: [
        "consumer electronics",
        "home products",
        "transportation",
        "industrial equipment",
        "outdoor gear",
        "medical devices",
      ],
    },
    colors: [{ type: String }],
    materials: [{ type: String }],
    finish: {
      type: String,
      enum: ["smooth", "rough", "dull", "matte", "reflective"],
    },
    photos: [{ type: String, required: true }],
    createAt: { type: Date },
    updatedAt: { type: Date },
    liked: { type: Number, default: 0 },
    comments: [{ type: String }],
  },
  { collection: "products", timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
