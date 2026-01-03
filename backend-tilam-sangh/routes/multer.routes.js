import express from 'express';
import upload from '../middleware/multer.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply authentication to all upload routes
router.use(protect, admin);

// POST /api/multer/upload-image
router.post('/upload-image', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  // Get folder from request body or use default
  const folder = req.body.folder || '';
  const fileUrl = folder ? `/uploads/${folder}/${req.file.filename}` : `/uploads/${req.file.filename}`;

  res.json({
    success: true,
    fileUrl,
    url: fileUrl,
    filename: req.file.filename
  });
});

// POST /api/multer/upload-pdf
router.post('/upload-pdf', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  // Get folder from request body or use default
  const folder = req.body.folder || '';
  const fileUrl = folder ? `/uploads/${folder}/${req.file.filename}` : `/uploads/${req.file.filename}`;

  res.json({
    success: true,
    fileUrl,
    url: fileUrl,
    filename: req.file.filename
  });
});

// Legacy endpoint for backward compatibility
router.post('/file', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const url = `/uploads/${req.body.folder ? req.body.folder + '/' : ''}${req.file.filename}`;
  res.json({ url });
});

export default router;