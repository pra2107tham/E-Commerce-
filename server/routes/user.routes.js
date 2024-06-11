import { Router } from "express";
const router = Router();
import { registerUser, refreshToken, loginUser, logoutUser, getUser } from "../controllers/user.controller.js";
import auth from "../middleware/auth.middleware.js";

router.post("/register", registerUser );
router.get("/refresh_token", refreshToken );
router.post("/login", loginUser );
router.get("/logout", logoutUser );
router.get("/info", auth, getUser)


export default router;
