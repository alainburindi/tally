import { Router } from "express";

const router = Router();

router.get("/signup", (req, res) => {
  res.render("register", { user: req.user });
});

export default router;
