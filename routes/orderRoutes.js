import express from "express"
import Stripe from "stripe"
import { v4 as uuidv4 } from "uuid"
const stripe = new Stripe(process.env.KEY)
import Order from "../models/orderModel.js"
const router = express.Router()

router.post("/placeorder", async (req, res) => {
  const { token, cartItems, currentUser, subtotal } = req.body
  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  })
  const payment = await stripe.charges.create(
    {
      amount: subtotal,
      currency: "eur",
      customer: customer.id,
      receipt_email: currentUser.email,
    },
    { idempotencyKey: uuidv4() }
  )
  if (payment) {
    const order = new Order({
      userid: currentUser._id,
      name: currentUser.name,
      emaill: currentUser.email,
      orderItems: cartItems,
      shippingAddress: {
        address: token.card.address_line1,
        city: token.card.address_city,
        country: token.card.address_country,
        postalCode: token.card.address_zip,
      },
      orderAmount: subtotal,
      transactionID: payment.source.id,
      isDelivered: false,
    })
    order.save((err) => {
      if (!err) {
        res.send("order placed")
      } else {
        res.send("order not placed")
      }
    })
  } else {
    res.send("Payment Failed")
  }
})

router.get("/order/:id", (req, res) => {
  const order = Order.find({ userid: req.params.id }, (err, doc) => {
    if (!err) {
      res.send(doc)
    }
  })
})

router.get("/orderdetails/:id", (req, res) => {
  const order = Order.find({ _id: req.params.id }, (err, doc) => {
    if (!err) {
      res.send(doc)
    }
  })
})

export default router
