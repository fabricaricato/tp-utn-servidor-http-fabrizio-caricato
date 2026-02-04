import {connect} from "mongoose"
import { config } from "dotenv"
config()

const URI_DB = process.env.URI_DB

const connectDb = async () => {
  try {
    await connect(URI_DB)
    console.log("=== 👌 SERVER CONNECTED 👌 ===")
  } catch (error) {
    console.log("=== ❌ Unable to connect to the server ❌ ===")
  }
}

export {connectDb}