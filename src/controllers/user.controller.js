import { User } from "../models/user.model.js"

const getUsers = async (req, res) => {
  try {
    const fetchedUsers = await User.find()
    return res.status(200).json({success: true, data: fetchedUsers})
  } catch (error) {
    return res.status(500).json({success: false, error: error.message})
  }
}

const createUser = async (req, res) => {
  try {
    const {username, email, password} = req.body
    const newUser = await User.create({
      username,
      email,
      password
    })
    return res.status(200).json({success: true, data: newUser})
  } catch (error) {
    return res.status(500).json({success: false, error: error.message})
  }
}

export {getUsers, createUser}