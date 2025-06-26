import { userAuth, userRegistration } from "../controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.route("/login").post(userAuth);
router.route("/registration").post(userRegistration);
router.route("/logout").post((req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

export default router;
