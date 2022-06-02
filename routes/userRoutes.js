import express from "express"
import User from "../models/userModel.js"
const router = express.Router()

router.post("/register", (req, res) => {
  User.find({ email: req.body.email }, (err, docs) => {
    if (docs.length > 0) {
      res.send("email already registered")
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      newUser.save((err) => {
        if (!err) {
          res.send("registration success")
        } else {
          res.status(401).json({ message: "something wrong" })
        }
      })
    }
    if (err) {
      res.status(401).json({ message: "something wrong" })
    }
  })
})

router.post("/login", (req, res) => {
  User.find(
    { email: req.body.email, password: req.body.password },
    (err, docs) => {
      if (docs.length > 0) {
        const user = {
          name: docs[0].name,
          _id: docs[0]._id,
          email: docs[0].email,
        }
        res.send(user)
      } else {
        res.status(401).json({ message: "something wrong" })
      }
      if (err) {
        res.status(401).json({ message: "something wrong" })
      }
    }
  )
})

router.post("/update", (req, res) => {
  const { userId, updateUser } = req.body
  User.findByIdAndUpdate(
    userId,
    {
      name: updateUser.name,
      password: updateUser.password,
      email: updateUser.email,
    },
    (err) => {
      if (!err) {
        res.send("user details updated")
      } else {
        res.send("not updated .sorry try again")
      }
    }
  )
})

router.get("/getallusers", async (req, res) => {
  const allusers = await User.find({})
  if (allusers) {
    res.send(allusers)
  } else {
    res.status(404).json({ message: "no user found" })
  }
})

router.delete("/delete/:id", async (req, res) => {
  /* const { id } = req.params.id */
  const allusers = await User.findByIdAndDelete(req.params.id)
  if (allusers) {
    res.send("user delete successfully")
  } else {
    res.status(404).json({ message: "something wrong" })
  }
})

export default router
