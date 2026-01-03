import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import Page from "../models/page.model.js";
import homeData from "../data/homeData.json" assert { type: "json" };
import galleryData from "../data/galleryData.json" assert { type: "json" };
import videoData from "../data/videoData.json" assert { type: "json" };
import infrastructureData from "../data/infrastructure.json" assert { type: "json" };
import TenderTableData from "../data/tenderTable.json" assert { type: "json" };
import marketingData from "../data/marketingData.json" assert { type: "json" };
import qualityData from "../data/qualityData.json" assert { type: "json" };
import financialData from "../data/financialData.json" assert { type: "json" };
import aboutData from "../data/aboutData.json" assert { type: "json" };
import profileData from "../data/profileData.json" assert { type: "json" };



// 🔑 MEDIA SEO UTILS (IMPORTED)
import { deepAddMediaSEO } from "./mediaSEO.seed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, "../.env"),
});

const MONGO_URL = `${process.env.MONGODB_URI}/tilam-sangh`;

const seedPages = async () => {
    try {
        // 🔥 Remove existing homepage
        // await Page.deleteMany({ slug: "", language: "English" });

        // 🔎 Collect OG images here
        const ogImages = [];

        // ✅ Add media SEO fields inside data
        const enrichedData = deepAddMediaSEO(profileData, ogImages);

        // 🔒 Guarantee: OpenGraph images never empty
        // const finalOgImages =
        //   ogImages.length > 0
        //     ? ogImages
        //     : [
        //         {
        //           url: "",
        //           width: "",
        //           height: "",
        //           alt: ""
        //         }
        //       ];

        const finalOgImages = [
            {
                url: "",
                width: "",
                height: "",
                alt: ""
            }
        ];

        // ✅ Create homepage document
        await Page.create({
            slug: "profile", // homepage
            language: "English",

            data: enrichedData,

            seo: {
                title: "",
                description: "",
                canonical: "",
                openGraph: {
                    title: "",
                    description: "",
                    url: "",
                    type: "",
                    images: finalOgImages
                }
            },

            status: true,
            deletedAt: null,
            dateCreated: new Date(),
            dateUpdated: null
        });

        console.log("✅ Page seeded with media SEO + OpenGraph images");
    } catch (error) {
        console.error("❌ Page seed failed:", error);
    }
};

const run = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("🟢 MongoDB connected");

        await seedPages();

        await mongoose.disconnect();
        console.log("🔌 MongoDB disconnected");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed process error:", err.message);
        process.exit(1);
    }
};

run();
