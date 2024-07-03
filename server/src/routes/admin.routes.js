import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

import {
    getAllMembers,
    deleteMember,
    editMember

} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/members").get(verifyJWT,
    getAllMembers
);
router.route("/member/:id").patch(verifyJWT,
    editMember
);
router.route("/member/:id").delete(verifyJWT,
    deleteMember
);


export default router;
