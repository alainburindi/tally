import { Router } from "express";
import authenticate from "../middleware/authenticate";
import {
  createVote,
  viewVote,
  submitChoice,
  deleteVote,
  getUserVotes,
} from "../controllers/vote";
import optionalAuth from "../middleware/optionalauth";

const router = Router();

router.post("/", authenticate, createVote);

router.get("/single/:id", optionalAuth, viewVote);
router.post("/submit", submitChoice);

router.get("/:id", (req, res) => res.render("vote"));

router.delete("/", authenticate, deleteVote);

router.get("/u/mine", authenticate, getUserVotes);

export default router;
