import { Router } from 'express';
const router = Router();

// Controllers
import { addOne } from '../controllers/ratings/addOne.js';
import { getAll } from '../controllers/ratings/getAll.js';
import { updateOne } from '../controllers/ratings/updateOne.js';

// Middlewares
import { validateToken, validateUser } from '../middleware/auth.js';

// Endpoints
router.get('/', getAll);
router.post('/add', [validateToken, validateUser], addOne);
router.post('/update/:id', [validateToken, validateUser], updateOne);

export default router;
