import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path"; // <- Importa 'path'
import { registerRoutes } from "./interfaces/routes";
import { connectDB } from "./config/sqlServerClient";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- SERVIR ARCHIVOS ESTÁTICOS ---
// Esto sirve todo lo que pongas en la carpeta 'public'
app.use(express.static(path.join(__dirname, "..", "public")));


// Rutas
registerRoutes(app);

// Levantar servidor después de conectar a la BD
const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  });
