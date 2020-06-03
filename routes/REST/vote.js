import { Router } from "express";
import authenticate from "../../middleware/authenticate";
import {
  createVote,
  viewVote,
  submitChoice,
  deleteVote,
  getUserVotes,
  getAll,
} from "../../controllers/vote";
import optionalAuth from "../../middleware/optionalauth";

const router = Router();

router.post("/", authenticate, createVote);

router.get("/:id", optionalAuth, viewVote);

router.post("/submit", submitChoice);

router.delete("/", authenticate, deleteVote);

router.get("/user/all", authenticate, getUserVotes);

router.get("/get/all", getAll);

export default router;
