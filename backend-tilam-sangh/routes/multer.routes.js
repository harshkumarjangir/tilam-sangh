import express from 'express';
import upload from '../middleware/multer.js';
const router = express.Router()
// POST /api/upload/file;
router.post('/file', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  // Return the file path or URL
  // Example: /uploads/assets/about-us/companyOverview/calling.webp
  const url = `/uploads/${req.body.folder ? req.body.folder + '/' : ''}${req.file.filename}`;
  res.json({ url });

});

export default router;