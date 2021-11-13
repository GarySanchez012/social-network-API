import {Router} from "express"
const router = Router();
import thoughtRoutes from './thought-routes.js';
import userRoutes from './user-routes.js';

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

export default router;
