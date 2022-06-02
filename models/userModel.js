import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timeStamps: true }
)

const User = mongoose.model("users", userSchema)

export default User
