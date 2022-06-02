import express from "express"
import mongoose from "mongoose"
import { dbConnect } from "./db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

const url = "mongodb+srv://saqeeb:saqeeb@cluster0.euyqv.mongodb.net/SHEY"

let app = express()
app.use(express.json())
dbConnect()
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders/", orderRoutes)
app.listen(8000, () => {
  console.log("server is running")
})
