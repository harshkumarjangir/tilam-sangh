import express from "express";
import {
    getAllVideos,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo,
    bulkUploadVideos
} from "../controllers/video.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect, admin);

router.get("/", getAllVideos);
router.get("/:id", getVideoById);
router.post("/", createVideo);
router.post("/bulk", bulkUploadVideos);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);

export default router;
