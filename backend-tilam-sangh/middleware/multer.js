import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Default to empty string, not 'uploads/'
    const folder = req.body.folder || '';
    // console.log("req.body.folder:", req.body.folder);
    const dest = path.join('uploads', folder);
    fs.mkdirSync(dest, { recursive: true }); // Create folder if not exists
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/\s+/g, '_'));
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif|svg|mp4|mov|avi|webm|ogg|pdf|doc|docx|xls|xlsx|txt|csv/;
  const ext = path.extname(file.originalname).toLowerCase().substring(1);
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error('Only image/video files allowed!'), false);
};

const upload = multer({ storage, fileFilter });
export default upload;