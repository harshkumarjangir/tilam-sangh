import express from "express";
import {
    getAllPhotos,
    getPhotoById,
    createPhoto,
    updatePhoto,
    deletePhoto,
    bulkUploadPhotos
} from "../controllers/gallery.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes are protected and require admin access
router.use(protect, admin);

// Get all photos
router.get("/", getAllPhotos);

// Get photo by ID
router.get("/:id", getPhotoById);

// Create new photo
router.post("/", createPhoto);

// Bulk upload photos
router.post("/bulk", bulkUploadPhotos);

// Update photo
router.put("/:id", updatePhoto);

// Delete photo
router.delete("/:id", deletePhoto);

export default router;
