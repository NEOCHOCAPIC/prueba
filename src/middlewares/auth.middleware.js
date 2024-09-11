// src/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig.js';

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log('Token:', token);  // Añade esta línea para depuración

    if (token) {
        jwt.verify(token, jwtConfig.secret, (err, decodedToken) => {
            if (err) {
                console.error('JWT Error:', err);  // Añade esta línea para depurar errores de JWT
                return res.redirect('/login');
            } else {
                req.user = decodedToken; // Guarda la información del usuario en req.user
                next();
            }
        });
    } else {
        req.user = null; // Asegúrate de definir req.user como null si no hay token
        next();
    }
};

