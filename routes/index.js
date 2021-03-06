import { Router } from "express";
import authRouter from "./auth";
import voteRouter from "./vote";
import restRouter from "./REST/index";
const router = Router();

router.use("/auth", authRouter);
router.use("/vote", voteRouter);
router.use("/rest", restRouter);

export default router;
