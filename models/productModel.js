import mongoose from "mongoose"

const reviewSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  { timeStamps: true }
)

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    countInStock: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    reviews: [reviewSchema],
  },
  { timeStamps: true }
)

const Product = mongoose.model("products", productSchema)

export default Product
