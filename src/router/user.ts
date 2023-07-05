import { Router} from 'express';
import {UserController} from '../controller/user-controller';

const router = Router();
const user = new UserController();

router.post("/register", user.registerUser);
router.post("/login", user.loginUser);

export default router;
