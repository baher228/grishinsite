import { protectMiddleware } from "@/middleware/protect.middleware";
import { userProfile } from "../controllers/user.controller";
import { Router } from "express";

const router = Router();

router.route("/profile").get(protectMiddleware, userProfile);

export default router;
