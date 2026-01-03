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

const updateTenderURLs = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(`${process.env.MONGODB_URI}/tilam-sangh`);
        console.log('✅ Database Connected');

        console.log('🔄 Updating database URLs...');

        // Get all tenders with URLs not in tenders subfolder
        const tenders = await Tender.find({
            downloadUrl: { $regex: '^/uploads/[^/]+\\.pdf$' } // Match /uploads/filename.pdf
        });

        console.log(`📊 Found ${tenders.length} tenders to update`);

        let updated = 0;
        for (const tender of tenders) {
            const filename = tender.downloadUrl.split('/').pop();
            const newUrl = `/uploads/tenders/${filename}`;

            await Tender.updateOne(
                { _id: tender._id },
                { $set: { downloadUrl: newUrl } }
            );

            console.log(`✅ Updated: ${tender.sno} - ${filename}`);
            updated++;
        }

        console.log('');
        console.log(`✅ Updated ${updated} tender URLs in database`);
        console.log('');
        console.log('🎉 Database migration completed successfully!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

updateTenderURLs();
