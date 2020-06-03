import { Router } from "express";
import { signup, login } from "../../controllers/auth";
import authenticate from "../../middleware/authenticate";
import sendResponse from "../../helpers/sendResponse";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/", authenticate, (req, res) =>
  sendResponse(res, 200, "authenticatited user", { user: req.user })
);

export default router;
