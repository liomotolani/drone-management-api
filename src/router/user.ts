import { Router} from 'express';
import {UserController} from '../controller/user-controller';
import { authenticateUser } from '../middleware/auth';

const router = Router();
const user = new UserController();

router.post("/register",user.registerUser);
router.post("/login",authenticateUser, user.loginUser);

export default router;
