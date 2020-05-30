import { Router } from "express";
import authenticate from "../middleware/authenticate";
import { createVote } from "../controllers/vote";

const router = Router();

router.post("/", authenticate, createVote);

export default router;
