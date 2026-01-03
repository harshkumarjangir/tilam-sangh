import express from 'express';
import { upload, uploadFile, listMedia, deleteMedia, getFileInfo } from '../controllers/media.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(protect, admin);

// Upload file
router.post('/upload', upload.single('file'), uploadFile);

// List all media files
router.get('/', listMedia);

// Get single file info
router.get('/:filename', getFileInfo);

// Delete file
router.delete('/:filename', deleteMedia);

export default router;
