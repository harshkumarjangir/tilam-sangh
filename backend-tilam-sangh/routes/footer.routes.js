import express from "express";
import {
    getAllFooters,
    getFooterById,
    createFooter,
    updateFooter,
    patchFooter,
    deleteFooter
} from "../controllers/footer.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes are protected and require admin access
router.use(protect, admin);

// Get all footers
router.get("/", getAllFooters);

// Get footer by ID
router.get("/:id", getFooterById);

// Create new footer
router.post("/", createFooter);

// Update footer
router.put("/:id", updateFooter);

// Patch footer (partial update)
router.patch("/:id", patchFooter);

// Delete footer
router.delete("/:id", deleteFooter);

export default router;
