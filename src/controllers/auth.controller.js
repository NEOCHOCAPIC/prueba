import { pool } from '../config/db.js'
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import jwtConfig from '../config/jwtConfig.js'
//funcion para llevar al formulario de registro
export const obtenerForm =  (req, res) => {
    res.render('auth/signup', { user: req.user || null });

}
//Funcion para registrar a un usuario 
export const postUser = async(req, res) => {
    // Validaciones
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('auth/register', { errors: errors.array() });
    }
    const { nombre, email, contraseña } = req.body
    try {
        // Verificar si el email ya existe
        const [existingUser] = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).render('auth/signup', { errors: [{ msg: 'El correo electrónico ya está en uso' }] });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        await pool.query('INSERT INTO usuario (nombre, email, contraseña) VALUES (?, ?, ?)', [nombre, email, hashedPassword]);

        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
};
// funcion para llevar al login
export const obtenerLogin = (req, res) => {
    res.render('auth/login', { user: req.user || null })
}

//funcion para iniciar sesion 
export const postLogin = async(req, res) => {
    const { email, contraseña } = req.body;
    try {
        const [user] = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);
        if (user.length > 0 && await bcrypt.compare(contraseña, user[0].contraseña)) {
            const token = jwt.sign({ id: user[0].id, email: user[0].email, nombre: user[0].nombre }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

            console.log(token)
            
            res.cookie('jwt', token, { httpOnly: true });
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        console.error(err);
        res.redirect('/login');
    }
};
//funcion para logout
export const logout = (req, res) => {
    console.log('Logout route accessed'); // Añade esta línea para depuración
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
};
