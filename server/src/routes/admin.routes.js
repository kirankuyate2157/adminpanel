import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

import {
    getAllMembers

} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/members").get(verifyJWT,
    getAllMembers
);


export default router;
