import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

const validateJWT = async (req, res, next) => {
  try {
    const token = req.headers['authorization']

    if (!token) {
      return res.status(401).json({ success: false, error: "there is no token in the request" })
    }

    jwt.verify(token, JWT_SECRET)

    next()

  } catch (error) {
    return res.status(400).json({ success: false, error: error.message })
  }
}

export {validateJWT}