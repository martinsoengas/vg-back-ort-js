import { Router } from 'express';
const router = Router();

// Controllers
import { createOne } from '../controllers/videogames/createOne.js';
import { getAll } from '../controllers/videogames/getAll.js';

// Middlewares
import { validateToken, validateDev } from '../middleware/auth.js';

// Endpoints
router.get('/', getAll);
router.post('/create', [validateToken, validateDev], createOne);

export default router;
