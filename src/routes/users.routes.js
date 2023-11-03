import { Router } from 'express';
const router = Router();

// Controllers
import { signUp } from '../controllers/users/signUp.js';
import { signIn } from '../controllers/users/signIn.js';
import { logout } from '../controllers/users/logout.js';

// Middlewares
import { validateToken, validateUser } from '../middleware/auth.js';

// Endpoints
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/logout', [validateToken, validateUser], logout);

export default router;
