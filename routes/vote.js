import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { createVote, viewVote, submitChoice } from "../controllers/vote";

const router = Router();

router.post("/", authenticate, createVote);
router.get("/single/:id", viewVote);
router.post("/submit", submitChoice);

router.get("/:id", (req, res) => res.render("vote"));

export default router;
