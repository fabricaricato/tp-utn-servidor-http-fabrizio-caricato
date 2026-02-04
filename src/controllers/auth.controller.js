import { User } from "../models/user.model.js"
import bcrypt, { compare } from "bcryptjs";
import jwt from "jsonwebtoken"

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES = process.env.JWT_EXPIRES

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({success: false, error: "You must complete all fields to register"})
    }

    if (!emailRegex.test(email) || (!email.endsWith(".com"))) {
      return res.status(400).json({success: false, error: "You must enter a valid email address"})
    }

    if (password.length < 4) {
      return res.status(400).json({ success: false, error: "The password must be at least 5 characters long." })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      username,
      email,
      password: passwordHash
    })

    return res.status(200).json({success: true, data: newUser})

  } catch (error) {
    return res.status(500).json({success: false, error: error.message}
    )
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const foundUser = await User.findOne({ email })

    const comparePasswords = await bcrypt.compare(password, foundUser.password)

    if (!comparePasswords) {
      return res.status(401).json({success: false, error: "Password comparison failed"})
    }

    const payload = {id: foundUser._id, email: foundUser.email, username: foundUser.username }

    const createdToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    return res.status(200).json({success: true, data: "Successfully authentication", token: createdToken})

  } catch (error) {
    return res.status(500).json({success: false, error: error.message})
  }
}

export {register, login}