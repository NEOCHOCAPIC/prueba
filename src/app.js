import express from 'express';
import index from './routes/index.routes.js';
import authRoutes from './routes/auth.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { isAuthenticated } from './middlewares/auth.middleware.js';

// Iniciar Express
const app = express();

// Decir dónde está la plantilla
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Middleware para datos de formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware para cookies
app.use(cookieParser());

// Middleware de autenticación
app.use(isAuthenticated);

// Obtener __dirname equivalente en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use(index);
app.use(authRoutes);

export default app;
