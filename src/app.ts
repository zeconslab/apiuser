import express, { Application } from "express";
import authRoutes from "./routes/routes";
import morgan from "morgan";

const app: Application = express();

// Configuracion inicial
app.set('port', 3000);


// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api',authRoutes);

export default app;