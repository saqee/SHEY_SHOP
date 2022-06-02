import mongoose from "mongoose"

const orderSchema = mongoose.Schema(
  {
    userid: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    orderItems: [
      {
        name: { type: String },
        qty: { type: Number },
        _id: { type: String },
        price: { type: Number },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      postalCode: {
        type: Number,
      },
      country: {
        type: String,
      },
    },
    orderAmount: {
      type: Number,
    },
    transactionID: {
      type: String,
    },
    isDelivered: {
      type: Boolean,
    },
  },

  { timestamps: true }
)

const Order = mongoose.model("orders", orderSchema)

export default Order
