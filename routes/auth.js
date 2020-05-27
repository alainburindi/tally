import { Router } from "express";
import { signup } from "../controllers/auth";
const router = Router();

router.get("/signup", (req, res) => {
  res.render("register", { user: req.user });
});

router.post("/signup", signup);

export default router;
