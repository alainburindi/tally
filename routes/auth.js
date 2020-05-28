import { Router } from "express";
import { signup, login } from "../controllers/auth";
import authenticate from "../middleware/authenticate";
import sendResponse from "../helpers/sendResponse";

const router = Router();

router.get("/signup", (req, res) => {
  res.render("register", { user: req.user });
});

router.post("/signup", signup);

router.get("/login", (req, res) => res.render("login", { user: req.user }));

router.post("/login", login);

router.get("/profile", (req, res) => res.render("profile"));

router.get("/user", authenticate, (req, res) =>
  sendResponse(res, 200, "authenticatited user", { user: req.user })
);

export default router;
