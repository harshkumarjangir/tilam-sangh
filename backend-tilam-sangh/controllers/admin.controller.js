import User from '../models/user.model.js';
import Page from '../models/page.model.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getDashboardStats = async (req, res) => {
    try {
        const [totalUsers, totalPages] = await Promise.all([
            User.countDocuments(),
            Page.countDocuments({ deletedAt: null })
        ]);

        // Calculate media files
        const mediaDir = path.join(__dirname, '../uploads/media');
        let totalMedia = 0;

        // Helper to count files recursively (simplified for now to just count top level or common folders if needed, but recursive is better)
        const countFiles = (dir) => {
            let count = 0;
            if (fs.existsSync(dir)) {
                const files = fs.readdirSync(dir);
                files.forEach(file => {
                    const filePath = path.join(dir, file);
                    const stats = fs.statSync(filePath);
                    if (stats.isDirectory()) {
                        count += countFiles(filePath);
                    } else {
                        count++;
                    }
                });
            }
            return count;
        };

        if (fs.existsSync(mediaDir)) {
            totalMedia = countFiles(mediaDir);
        }

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalPages,
                totalMedia
            }
        });
    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard stats'
        });
    }
};
