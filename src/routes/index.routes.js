import {Router} from 'express'
const router = Router()
import { getIndex } from '../controllers/index.controller.js';
router.get('/', getIndex)






export default router