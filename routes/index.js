import { Router } from "express";
import authRouter from "./auth";
import voteRouter from "./vote";

const router = Router();

router.use("/auth", authRouter);
router.use("/vote", voteRouter);
export default router;
