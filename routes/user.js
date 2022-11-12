import { Router } from "express";

const router = Router();

import { googlesignin, signup } from '../controllers/user.js';
import { signin } from '../controllers/user.js';

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googlesignin", googlesignin);

export default router