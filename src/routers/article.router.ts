import { Router } from "express";
import { createArticle, getArticle } from "../controllers/article.controller";

const router = Router();
router.get("/", getArticle);
router.post("/", createArticle);

export default router;
