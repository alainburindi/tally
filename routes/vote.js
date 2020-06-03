import { Router } from "express";

const router = Router();

router.get("/:id", (req, res) => res.render("vote"));

export default router;
