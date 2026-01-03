import mongoose from "mongoose";
import Tender from "../models/tender.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from parent directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedTendersFromPages = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(`${process.env.MONGODB_URI}/tilam-sangh`);
        console.log("✅ Database Connected");

        // Read pages JSON file
        const jsonPath = path.join(__dirname, "../tilam-sangh.pages.json");
        const jsonData = fs.readFileSync(jsonPath, "utf-8");
        const pages = JSON.parse(jsonData);

        // Find page with tenders
        const pageWithTenders = pages.find(p => p.data?.tenders);

        if (!pageWithTenders) {
            console.log("❌ No page with tenders found!");
            process.exit(1);
        }

        console.log(`📄 Found page with slug: '${pageWithTenders.slug}'`);
        console.log(`📊 Total tenders in page: ${pageWithTenders.data.tenders.length}`);

        // Clear existing tenders
        await Tender.deleteMany({});
        console.log("🗑️  Cleared existing tenders");

        // Prepare tender documents
        const tenders = pageWithTenders.data.tenders.map((tender, index) => ({
            sno: tender.sno || (index + 1),
            particular: tender.particular,
            date: new Date(tender.date),
            downloadUrl: tender.downloadUrl.replace('/assets/tenders/', '/uploads/'),
            status: true
        }));

        // Insert tenders
        const result = await Tender.insertMany(tenders);
        console.log(`✅ Inserted ${result.length} tenders`);

        console.log("\n📊 Sample tender:");
        console.log({
            sno: result[0].sno,
            particular: result[0].particular.substring(0, 50) + "...",
            date: result[0].date,
            downloadUrl: result[0].downloadUrl
        });

        console.log("\n🎉 Tender seeding completed successfully!");
        console.log(`\nAccess tenders at: http://localhost:5000/api/tenders`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};

seedTendersFromPages();
