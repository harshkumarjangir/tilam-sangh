import express from "express";
import { getPageBySlug } from "../controllers/page.controller.js";

const router = express.Router();

// Homepage
router.get("/", getPageBySlug);

// Any page
router.get("/:slug", getPageBySlug);

export default router;
