import { Router } from "express";
import { register, showuser, verifyEmail } from "../controllers/user.controller";
import { tokenValidation } from "../services/verifyToken";

const router: Router = Router();

router.post('/register', register);
router.post('/profile', tokenValidation , showuser);
router.post('/user/verifyemail/:token', verifyEmail);

export default router;