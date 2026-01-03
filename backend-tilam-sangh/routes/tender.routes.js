import express from "express";
import {
    getAllTenders,
    getTenderById,
    createTender,
    updateTender,
    deleteTender,
    bulkUploadTenders
} from "../controllers/tender.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes - anyone can view tenders
router.get("/", getAllTenders);
router.get("/:id", getTenderById);

// Protected routes - only admin can create/update/delete
router.post("/", protect, admin, createTender);
router.post("/bulk", protect, admin, bulkUploadTenders);
router.put("/:id", protect, admin, updateTender);
router.delete("/:id", protect, admin, deleteTender);

export default router;
