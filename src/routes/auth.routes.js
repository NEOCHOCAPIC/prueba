import { Router } from 'express';
const router = Router()
import { obtenerForm, obtenerLogin, postLogin, postUser, logout} from '../controllers/auth.controller.js'

//Ruta para el formulario de registro
router.get('/signup', obtenerForm)

//Ruta para manejar el registro
router.post('/signup', postUser)

//Ruta para formulario del login
router.get('/login', obtenerLogin)

//Ruta para manejar el login
router.post('/login',postLogin)

//Ruta para cerrar sesion
router.get('/logout', logout)

export default router