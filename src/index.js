import { connectDb } from "./config/mongodb.js"
import express from "express"
import cors from "cors"
import { config } from "dotenv"
import { getUsers, createUser } from "./controllers/user.controller.js"
config()

const PORT = process.env.PORT

// CONFIGURACIÓN DEL SERVIDOR
const servidor = express()
servidor.use(express.json())
servidor.use(cors())

servidor.get("/users", getUsers)
servidor.post("/users", createUser)

// CONEXIÓN Y ESCUCHA DEL PUERTO
servidor.listen(PORT, () => {
  connectDb()
  console.log(`=== 👂 Escuchando en el puerto: ${PORT} 👂 ===`)
})