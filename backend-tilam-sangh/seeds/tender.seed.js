import mongoose from "mongoose";
import Tender from "../models/tender.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const seedTenders = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(`${process.env.MONGODB_URI}/tilam-sangh`);
        console.log("✅ Database Connected");

        // Read JSON file
        const jsonPath = path.join(__dirname, "../data/tenderTable.json");
        const jsonData = fs.readFileSync(jsonPath, "utf-8");
        const tenderData = JSON.parse(jsonData);

        // Clear existing tenders
        await Tender.deleteMany({});
        console.log("🗑️  Cleared existing tenders");

        // Prepare tender documents
        const tenders = tenderData.tenders.map(tender => ({
            sno: tender.sno,
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

seedTenders();
