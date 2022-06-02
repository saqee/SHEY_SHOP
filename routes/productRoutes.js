import express from "express"
import Product from "../models/productModel.js"
const router = express.Router()

router.get("/getallProducts", (req, res) => {
  Product.find({}, (err, docs) => {
    if (!err) {
      return res.send(docs)
    } else {
      return res.status(400).json({ message: " docs not render" })
    }
  })
})

router.get("/getproductbyid/:id", (req, res) => {
  const { id } = req.params.id
  Product.find({ _id: req.params.id }, (err, docs) => {
    if (!err) {
      return res.send(docs[0])
    } else {
      return res.status(400).json({ message: " docs not render" })
    }
  })
})

router.post("/addreview", async (req, res) => {
  const { review, productId, currentUser } = req.body
  const product = await Product.findById({ _id: productId })
  const reviewModel = {
    name: currentUser.name,
    comment: review.comment,
    userid: currentUser._id,
  }
  product.reviews.push(reviewModel)
  product.save((err) => {
    if (!err) {
      res.send("review success")
    }
  })
})

router.get("/getallproductsadmin", (req, res) => {
  Product.find({}, (err, doc) => {
    if (err) {
      res.status(400).wrongjson({ message: "somethnig " })
    } else {
      res.send(doc)
    }
  })
})

router.post("/addproduct", async (req, res) => {
  const product = req.body
  const newProduct = await new Product({
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    countInStock: product.countInStock,
    image: product.imagesUrl,
  })
  newProduct.save((err) => {
    if (err) {
      res.send("product not added")
    } else {
      res.send("product added")
    }
  })
})

router.put("/updateproduct/:editId", async (req, res) => {
  const product = req.body
  console.log(product)
  const updateItem = await Product.findByIdAndUpdate(req.params.editId, {
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    countInStock: product.countInStock,
    image: product.imageUrl,
  })
  updateItem.save((err) => {
    if (err) {
      res.send("product not added")
    } else {
      res.send("product added")
    }
  })
})
export default router
