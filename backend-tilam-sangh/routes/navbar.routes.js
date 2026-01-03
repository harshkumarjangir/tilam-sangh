import express from "express";
import {
    getAllNavbars,
    getNavbarById,
    createNavbar,
    updateNavbar,
    patchNavbar,
    deleteNavbar
} from "../controllers/navbar.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes are protected and require admin access
router.use(protect, admin);

// Get all navbars
router.get("/", getAllNavbars);

// Get navbar by ID
router.get("/:id", getNavbarById);

// Create new navbar
router.post("/", createNavbar);

// Update navbar
router.put("/:id", updateNavbar);

// Patch navbar (partial update)
router.patch("/:id", patchNavbar);

// Delete navbar
router.delete("/:id", deleteNavbar);

export default router;
