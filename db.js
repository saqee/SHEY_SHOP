import mongoose from "mongoose"

const url = "mongodb+srv://saqeeb:saqeeb@cluster0.euyqv.mongodb.net/SHEY"

export const dbConnect = () => {
  mongoose
    .connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
      console.log("connected")
    })
    .catch((err) => {
      console.log(err)
    })
}
