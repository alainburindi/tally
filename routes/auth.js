import { Router } from "express";
import { signup, login } from "../controllers/auth";
const router = Router();

router.get("/signup", (req, res) => {
  res.render("register", { user: req.user });
});

router.post("/signup", signup);

router.get("/login", (req, res) => res.render("login", { user: req.user }));

router.post("/login", login);

export default router;
