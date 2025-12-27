import express from "express";
import { getPageBySlug, patchServiceBySlug } from "../controllers/page.controller.js";

const router = express.Router();

// Homepage
router.get("/", getPageBySlug);

// Any page
router.get("/:slug", getPageBySlug);

router.patch("/update-service/:slug", patchServiceBySlug)

export default router;
