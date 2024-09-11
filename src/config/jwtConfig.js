// src/config/jwtConfig.js
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

const jwtConfig = {
    secret: process.env.JWT_SECRET || 'tu_clave_secreta', // Clave secreta para firmar el token
    expiresIn: process.env.JWT_EXPIRES_IN || '1h' // Tiempo de expiración del token
};

console.log('JWT Config Loaded:', jwtConfig); // Añade esta línea para depurar

export default jwtConfig;
