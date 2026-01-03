import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads/media directory exists
const uploadsDir = path.join(__dirname, '../uploads/media');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = req.query.folder || req.body.folder || '';
        const targetDir = folder ? path.join(uploadsDir, folder) : uploadsDir;

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        cb(null, targetDir);
    },
    filename: (req, file, cb) => {
        // Generate unique filename: timestamp-originalname
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const nameWithoutExt = path.basename(file.originalname, ext);
        cb(null, `${nameWithoutExt}-${uniqueSuffix}${ext}`);
    }
});

// File filter for allowed types
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|doc|docx|xls|xlsx|txt|csv/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    // Mimetype check might be too strict for some file types, relying mostly on extension
    // const mimetype = allowedTypes.test(file.mimetype);

    if (extname) {
        cb(null, true);
    } else {
        cb(new Error('Only images and documents are allowed!'));
    }
};

// Multer upload configuration
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    },
    fileFilter: fileFilter
});

// Upload single file
export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const folder = req.query.folder || req.body.folder || '';
        const fileUrl = folder
            ? `/uploads/media/${folder}/${req.file.filename}`
            : `/uploads/media/${req.file.filename}`;

        res.status(200).json({
            success: true,
            message: 'File uploaded successfully',
            data: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                url: fileUrl,
                size: req.file.size,
                mimetype: req.file.mimetype
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'File upload failed'
        });
    }
};

// List all media files
export const listMedia = async (req, res) => {
    try {
        const folder = req.query.folder || '';
        // Prevent directory traversal
        if (folder.includes('..')) {
            return res.status(400).json({ success: false, message: 'Invalid folder path' });
        }

        const currentDir = folder ? path.join(uploadsDir, folder) : uploadsDir;

        if (!fs.existsSync(currentDir)) {
            // If folder doesn't exist, return empty list instead of error
            // This allows the UI to show an empty folder ready for upload
            return res.status(200).json({ success: true, data: [] });
        }

        const files = fs.readdirSync(currentDir);

        const mediaFiles = files.map(filename => {
            const filePath = path.join(currentDir, filename);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                return {
                    filename,
                    path: folder ? `${folder}/${filename}` : filename,
                    type: 'folder',
                    items: fs.readdirSync(filePath).length, // count items
                    uploadedAt: stats.birthtime
                };
            }

            const ext = path.extname(filename).toLowerCase();
            return {
                filename,
                url: folder ? `/uploads/media/${folder}/${filename}` : `/uploads/media/${filename}`,
                size: stats.size,
                uploadedAt: stats.birthtime,
                type: ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext) ? 'image' : 'pdf'
            };
        });

        // Sort: Folders first, then files by specific order (newest first)
        mediaFiles.sort((a, b) => {
            if (a.type === 'folder' && b.type !== 'folder') return -1;
            if (a.type !== 'folder' && b.type === 'folder') return 1;
            return b.uploadedAt - a.uploadedAt;
        });

        res.status(200).json({
            success: true,
            data: mediaFiles
        });
    } catch (error) {
        console.error('List media error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to list media files'
        });
    }
};

// Delete media file
export const deleteMedia = async (req, res) => {
    try {
        const { filename } = req.params;
        const folder = req.query.folder || '';

        // Prevent directory traversal
        if (folder.includes('..')) {
            return res.status(400).json({ success: false, message: 'Invalid folder path' });
        }

        const targetDir = folder ? path.join(uploadsDir, folder) : uploadsDir;
        const filePath = path.join(targetDir, filename);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: 'File not found'
            });
        }

        // Delete the file
        fs.unlinkSync(filePath);

        res.status(200).json({
            success: true,
            message: 'File deleted successfully'
        });
    } catch (error) {
        console.error('Delete media error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete file'
        });
    }
};

// Get single file info
export const getFileInfo = async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(uploadsDir, filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: 'File not found'
            });
        }

        const stats = fs.statSync(filePath);
        const ext = path.extname(filename).toLowerCase();

        res.status(200).json({
            success: true,
            data: {
                filename,
                url: `/uploads/media/${filename}`,
                size: stats.size,
                uploadedAt: stats.birthtime,
                type: ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext) ? 'image' : 'pdf'
            }
        });
    } catch (error) {
        console.error('Get file info error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get file info'
        });
    }
};
