import { Router } from 'express';
const router = Router();

// Controllers
import { getAll } from '../controllers/developers/getAll.js';
import { createOne } from '../controllers/developers/createOne.js';
import { getByID } from '../controllers/developers/getByID.js';
import { updateOneByID } from '../controllers/developers/updateOneByID.js';
import { deleteOneByID } from '../controllers/developers/deleteOneByID.js';

import { signUp } from '../controllers/developers/signUp.js';
import { signIn } from '../controllers/developers/signIn.js';
import { logout } from '../controllers/developers/logout.js';

// Middlewares
import { validateToken, validateDev } from '../middleware/auth.js';
// Endpoints
router.get('/', getAll);
router.get('/:id', [validateToken, validateDev], getByID);
router.post('/create', [validateToken, validateDev], createOne);
router.put('/update/:id', [validateToken, validateDev], updateOneByID);
router.delete('/delete/:id', [validateToken, validateDev], deleteOneByID);

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/logout', [validateToken, validateDev], logout);

export default router;
