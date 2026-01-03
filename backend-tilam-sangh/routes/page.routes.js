import express from "express";
import { getPageBySlug, patchServiceBySlug, createPage, deletePage, getAllPages, updatePage } from "../controllers/page.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

// List all pages (Admin)
router.get("/list/all", protect, admin, getAllPages);

// Homepage
router.get("/", getPageBySlug);

// Create new page (Admin only)
router.post("/", protect, admin, createPage);

// Update/Patch page (Admin only)
router.patch("/update-service/:slug", protect, admin, patchServiceBySlug);
// Full Update (Admin only)
router.put("/", protect, admin, updatePage);
router.put("/:slug", protect, admin, updatePage);

// Delete page (Admin only)
router.delete("/:slug", protect, admin, deletePage);

// Get specific page (Public) - Put this last to avoid collision with specific paths if any
router.get("/:slug", getPageBySlug);

export default router;
