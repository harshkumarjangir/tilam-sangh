import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Default to empty string, not 'uploads/'
    const folder = req.body.folder || '';
    console.log("Multer Destination - req.body.folder:", req.body.folder);
    console.log("Multer Destination - computed folder:", folder);
    const dest = path.join('uploads', folder);
    console.log("Multer Destination - full path:", dest);
    if (!fs.existsSync(dest)) {
      console.log("Creating directory:", dest);
      fs.mkdirSync(dest, { recursive: true });
    }
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/\s+/g, '_'));
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif|svg|ico|mp4|mov|avi|webm|ogg|pdf|doc|docx|xls|xlsx|txt|csv/;
  const ext = path.extname(file.originalname).toLowerCase().substring(1);
  console.log("Multer FileFilter - Original Name:", file.originalname);
  console.log("Multer FileFilter - Extracted Ext:", ext);
  console.log("Multer FileFilter - Is Allowed:", allowed.test(ext));

  if (allowed.test(ext)) cb(null, true);
  else cb(new Error('Only image/video files allowed!'), false);
};

const upload = multer({ storage, fileFilter });
export default upload;