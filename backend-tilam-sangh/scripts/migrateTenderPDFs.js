import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Tender from '../models/tender.model.js';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from parent directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const moveTenderPDFs = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(`${process.env.MONGODB_URI}/tilam-sangh`);
        console.log('✅ Database Connected');

        const uploadsDir = path.join(__dirname, '../uploads');
        const tendersDir = path.join(__dirname, '../uploads/tenders');

        // Create tenders directory if it doesn't exist
        if (!fs.existsSync(tendersDir)) {
            fs.mkdirSync(tendersDir, { recursive: true });
            console.log('📁 Created uploads/tenders directory');
        }

        // Get all PDF files from uploads directory
        const files = fs.readdirSync(uploadsDir);
        const pdfFiles = files.filter(file =>
            file.toLowerCase().endsWith('.pdf') &&
            fs.statSync(path.join(uploadsDir, file)).isFile()
        );

        console.log(`\n📊 Found ${pdfFiles.length} PDF files in uploads/`);
        console.log('');

        let moved = 0;
        let skipped = 0;

        // Move each PDF file
        for (const file of pdfFiles) {
            const sourcePath = path.join(uploadsDir, file);
            const destPath = path.join(tendersDir, file);

            if (fs.existsSync(destPath)) {
                console.log(`⏭️  Skipped (already exists): ${file}`);
                skipped++;
            } else {
                fs.renameSync(sourcePath, destPath);
                console.log(`✅ Moved: ${file}`);
                moved++;
            }
        }

        console.log('');
        console.log('📊 File Movement Summary:');
        console.log(`✅ Moved: ${moved} files`);
        console.log(`⏭️  Skipped: ${skipped} files`);

        // Update database URLs
        console.log('');
        console.log('🔄 Updating database URLs...');

        const result = await Tender.updateMany(
            { downloadUrl: { $regex: '^/uploads/[^/]+\\.pdf$' } }, // Match /uploads/filename.pdf (not already in subfolder)
            [
                {
                    $set: {
                        downloadUrl: {
                            $concat: [
                                '/uploads/tenders/',
                                { $arrayElemAt: [{ $split: ['$downloadUrl', '/'] }, -1] }
                            ]
                        }
                    }
                }
            ]
        );

        console.log(`✅ Updated ${result.modifiedCount} tender URLs in database`);

        console.log('');
        console.log('🎉 Migration completed successfully!');
        console.log('All tender PDFs are now in uploads/tenders/');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

moveTenderPDFs();
