import { connectDb } from "./config/mongodb.js"
import express from "express"
import cors from "cors"
import { config } from "dotenv"
import { authRouter } from "./router/authRouter.js"
import { taskRouter } from "./router/taskRouter.js"
import { validateJWT } from "./middleware/middleware.js"
config()

connectDb()

const PORT = process.env.PORT

// Configuración del servidor
const server = express()
server.use(express.json())
server.use(cors())

// Ruta de bienvenida para evadir Cannot GET /
server.get('/', (req, res) => {
  res.send(`
    <h1>RESTful API Running! 🚀</h1>
    <p>Welcome to the Task Manager backend.</p>
    <p>Main Endpoints:</p>
    <ul>
      <li>POST /api/auth/register (Register user)</li>
      <li>POST /api/auth/login (Login / Get Token)</li>
      <li>GET /api/tasks (View tasks - Token Required)</li>
    </ul>
    <h4>Please check the project's README.md file to get started!</h4>
    <p>Developed by Fabrizio Caricato</p>
  `);
});

// Endpoints
server.use("/api/auth", authRouter)
server.use("/api/tasks", validateJWT, taskRouter)

// Conexión y escucha del puerto (evalua si existe la variable automática de vercel)
if (!process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(`=== 👂 Servidor local corriendo en puerto: ${PORT} 👂 ===`)
  })
}

export default server