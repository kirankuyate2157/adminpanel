import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

import {
  registration,
  loginUser,
  logoutUser,
  refreshTokenToAccessToken,
  changeCurrentPassword,
  getCurrentUser,
 
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  registration
);
router.route("/login").post(loginUser);
//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshTokenToAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/get-current-user").get(verifyJWT, getCurrentUser);

export default router;
